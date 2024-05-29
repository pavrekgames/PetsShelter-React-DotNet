using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.SickPet;
using DotNetApi.Interfaces;
using DotNetApi.Mappers;
using DotNetApi.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotNetApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class SickPetController : ControllerBase
    {
        private readonly ApplicationDBContext context;

        private readonly ISickPetRepository sickPetRepository;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IFilesService filesService;

        public SickPetController(ApplicationDBContext context, ISickPetRepository sickPetRepository, IWebHostEnvironment webHostEnvironment, IFilesService filesService)
        {
            this.context = context;
            this.sickPetRepository = sickPetRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.filesService = filesService;
        }

        [HttpGet("sick-pets")]
        [Authorize]
        public async Task<IActionResult> GetSickPets()
        {
            var pets = await sickPetRepository.GetSickPetsAsync();

            return Ok(pets);
        }

        [HttpGet("{sick-pet:int}")]
        [Authorize]
        public async Task<IActionResult> GetSickPetById([FromRoute] int id)
        {
            var pet = await sickPetRepository.GetSickPetByIdAsync(id);

            if (pet == null)
            {
                return NotFound();
            }

            return Ok(pet);
        }

        [HttpPost("add-sick-pet")]
        [Authorize(Roles = "Admin")]
        
        public async Task<IActionResult> Create([FromForm] CreateSickPetDto petDto)
        {

            string photoName = filesService.UploadPhotoAndGetName(petDto);

            string photoUrlPath = String.Format("{0}://{1}{2}/Storage/{3}", Request.Scheme, Request.Host, Request.PathBase, photoName);

            var pet = petDto.ToSickPetFromCreateDto(photoUrlPath);

            await sickPetRepository.CreateAsync(pet);

            return Ok("Dodano chore zwierzę");
        }


    }
}