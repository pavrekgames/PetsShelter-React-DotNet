using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.Account;
using DotNetApi.Extensions;
using DotNetApi.Interfaces;
using DotNetApi.Mail;
using DotNetApi.Models;
using DotNetApi.Services;
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
        private readonly ApplicationDBContext context;
        private readonly IMailService mailService;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, ApplicationDBContext context, IMailService mailService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.context = context;
            this.mailService = mailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
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
        public async Task<IActionResult> Login(LoginDto loginDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Nie istnieje konto o podanym adresie E-mail");

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("E-mail lub hasło są nieprawidłowe");

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
        public async Task<IActionResult> Me()
        {

            var userName = User.GetUserName();
            var authorizedUser = await userManager.FindByNameAsync(userName);

            var user = new AuthorizedUserDto
            {
                Id = authorizedUser.Id,
                Name = authorizedUser.Name,
                Surname = authorizedUser.Surname,
                Email = authorizedUser.Email,
                Role = authorizedUser.Role,
                Tokens_Count = authorizedUser.TokensCount
            };

            return Ok(user);
        }

        [HttpPut("edit-profile")]
        [Authorize]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateUserDto userDto)
        {

            var userName = User.GetUserName();
            var authorizedUser = await userManager.FindByNameAsync(userName);

            authorizedUser.Name = userDto.Name;
            authorizedUser.Surname = userDto.Surname;

            await context.SaveChangesAsync();
            return Ok("Edytowano profil");
        }

        [HttpPost("transfer-tokens/{id:int}")]
        [Authorize]
        public async Task<IActionResult> TransferTokens([FromRoute] int id, [FromBody] TransferTokensDto userDto)
        {

            var userName = User.GetUserName();
            var authorizedUser = await userManager.FindByNameAsync(userName);
            var sickPet = await context.SickPets.FirstOrDefaultAsync(x => x.Id == id);
            var tokensCount = userDto.Tokens_Count;

            if (sickPet.Status == "Zakończone")
            {
                return BadRequest("Status akcji zakończony");
            }

            using var transaction = context.Database.BeginTransaction();

            try
            {
                authorizedUser.TokensCount -= tokensCount;
                sickPet.CurrentTokens += tokensCount;
                await context.SaveChangesAsync();

                if (sickPet.CurrentTokens >= sickPet.RequiredTokens)
                {
                    sickPet.Status = "Zakończone";
                    await context.SaveChangesAsync();
                }

                transaction.Commit();
            }
            catch (System.Exception)
            {
                transaction.Rollback();
            }

            await context.SaveChangesAsync();
            return Ok("Przelano żetony");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromForm] ResetPasswordDto userDto)
        {

            var user = await context.Users.FirstOrDefaultAsync(x => x.Name == userDto.Name && x.Email == userDto.Email);

            if (user == null)
            {
                return BadRequest("Nie ma takiego użytkownika");
            }

            string newPassword = "696969";

            MailData mailData = mailService.ResetPasswordMail(newPassword, user);
            bool hasMailSended = await mailService.SendMailAsync(mailData);

            if (hasMailSended)
            {
                await userManager.ChangePasswordAsync(user, user.PasswordHash, newPassword);
                return Ok();
            }
            else
            {
                return BadRequest("Wystąpił problem z wysłaniem maila");
            }
        }


    }
}