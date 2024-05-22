using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.SickPet;
using Microsoft.AspNetCore.Mvc;

namespace DotNetApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class SickPetController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        private readonly IWebHostEnvironment webHostEnvironment;

        public SickPetController(ApplicationDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("sick-pets")]
        public async Task<IActionResult> GetNewestPets()
        {

            

            return Ok();
        }

         [HttpPost("add-sick-pet")]
        public async Task<IActionResult> Create([FromForm] CreateSickPetDto petDto)
        {

           
            return Ok();
        }


    }
}