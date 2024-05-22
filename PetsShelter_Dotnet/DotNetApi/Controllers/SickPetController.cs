using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.SickPet;
using DotNetApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DotNetApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class SickPetController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IFilesService filesService;

        public SickPetController(ApplicationDBContext context, IWebHostEnvironment webHostEnvironment, IFilesService filesService)
        {
            this.context = context;
            this.webHostEnvironment = webHostEnvironment;
            this.filesService = filesService;
        }

        [HttpGet("sick-pets")]
        public async Task<IActionResult> GetNewestPets()
        {

            

            return Ok();
        }

         [HttpPost("add-sick-pet")]
        public async Task<IActionResult> Create([FromForm] CreateSickPetDto petDto)
        {
            string photoName = filesService.UploadPhotoAndGetName(petDto);

            string photoUrlPath = String.Format("{0}://{1}{2}/Storage/{3}", Request.Scheme, Request.Host, Request.PathBase, photoName);
           
            return Ok();
        }


    }
}