using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.User;
using DotNetApi.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        public UserController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            var usersDto = users.Select(s => s.ToUserDto());

            return Ok(usersDto);
        }

        [HttpGet("pet-owners")]
        public async Task<IActionResult> GetPetOwners(){

            var users = await (from p in context.Users
                  join e in context.Pets
                  on p.Id equals e.UserId
                  select new { 
                               Name = p.Name, 
                               Surname = p.Surname, 
                               PetName = e.Name, 
                               PetSpecies = e.Species, 
                               PetPhoto = e.Photo_Path 
                  }).ToListAsync();

            return Ok(users);
        }

        [HttpPost("users/delete")]
        [Authorize]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserDto userDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userDto.Id);

            if (user == null)
            {
                return BadRequest($"Nie znaleziono użytkownika o id {userDto.Id}");
            }

            context.Users.Remove(user);
            await context.SaveChangesAsync();

            return Ok();
        }

    }
}