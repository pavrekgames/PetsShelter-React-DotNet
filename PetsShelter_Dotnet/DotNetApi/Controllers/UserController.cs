using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Mappers;
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
        public async Task<IActionResult> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            var usersDto = users.Select(s => s.ToUserDto());

            return Ok(usersDto);
        }

    }
}