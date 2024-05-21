using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Dtos.Account;
using DotNetApi.Interfaces;
using DotNetApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenService tokenService;
        private readonly SignInManager<User> signInManager;

        public AccountController(UserManager<User> userManager,ITokenService tokenService ,SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = new User
                {
                    Name = registerDto.Name,
                    Surname = registerDto.Surname,
                    Email = registerDto.Email,
                    UserName = registerDto.Email
                };

                var createdUser = await userManager.CreateAsync(user, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var userRole = await userManager.AddToRoleAsync(user, "User");
                    if (userRole.Succeeded)
                    {
                        return Ok("Zostałeś zarejestrowany");
                    }
                    else
                    {
                        return StatusCode(500, userRole.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }

            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var user = await userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if(user == null) return Unauthorized("Nie istnieje konto o podanym adresie E-mail");

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized("E-mail lub hasło są nieprawidłowe");

            return Ok(
                new LoggedUserDto
                {
                    Email = user.Email,
                    Token = tokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("me")]
        [Authorize]
        public async Task<IActionResult> Me(){

            var authorizedUser = await userManager.GetUserAsync(User);

           /* var user = new AuthorizedUserDto
                {
                    Id = authorizedUser.Id,
                    Name = authorizedUser.Name,
                    Surname = authorizedUser.Surname,
                    Email = authorizedUser.Email,
                    Role = authorizedUser.
                }; */

            return Ok();
        }

    }
}