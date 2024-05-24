using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.Pet;
using DotNetApi.Extensions;
using DotNetApi.Helpers;
using DotNetApi.Interfaces;
using DotNetApi.Mappers;
using DotNetApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client.Extensions.Msal;

namespace DotNetApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class PetController : ControllerBase
    {

        private readonly ApplicationDBContext context;
        private readonly IPetRepository petRepository;
        private readonly ILogger<PetController> logger;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IFilesService filesService;

        private readonly UserManager<User> userManager;

        public PetController(ApplicationDBContext context,
          IPetRepository petRepository,
          ILogger<PetController> logger,
          IWebHostEnvironment webHostEnvironment,
          IFilesService filesService,
          UserManager<User> userManager)
        {
            this.context = context;
            this.petRepository = petRepository;
            this.logger = logger;
            this.webHostEnvironment = webHostEnvironment;
            this.filesService = filesService;
            this.userManager = userManager;
        }

        [HttpGet("newest-pets")]
        public async Task<IActionResult> GetNewestPets()
        {

            var pets = await context.Pets.OrderByDescending(x => x.Id).Take(3).OrderBy(x => x.Id).ToListAsync();
            var petsDto = pets.Select(s => s.ToPetDto());

            return Ok(petsDto);
        }

        [HttpGet("pets-to-adopt")]
        public async Task<IActionResult> GetPets()
        {
            var pets = await context.Pets.ToListAsync();
            var petsDto = pets.Select(s => s.ToPetDto());

            return Ok(petsDto);
        }

        [HttpGet("pets-to-adopt/{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetPetById([FromRoute] int id)
        {
            var pet = await petRepository.GetByIdAsync(id);

            if (pet == null)
            {
                return NotFound();
            }

            return Ok(pet);
        }

        [HttpPost("add-pet")]
        public async Task<IActionResult> Create([FromForm] CreatePetDto petDto)
        {
            string photoName = filesService.UploadPhotoAndGetName(petDto);

            string photoUrlPath = String.Format("{0}://{1}{2}/Storage/{3}", Request.Scheme, Request.Host, Request.PathBase, photoName);

            var pet = petDto.ToPetFromCreateDto(photoUrlPath);

            await petRepository.CreateAsync(pet);

            return CreatedAtAction(nameof(GetPetById), new { id = pet.Id }, pet.ToPetDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePetDto petDto)
        {
            var pet = await petRepository.UpdateAsync(id, petDto);

            if (pet == null)
            {
                return NotFound();
            }

            return Ok(pet.ToPetDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {

            logger.LogError($"Delete Action Invoked on {id} id");

            var pet = await petRepository.DeleteAsync(id);

            if (pet == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("my-pets")]
        [Authorize]
        public async Task<IActionResult> GetMyPets()
        {
            var userName = User.GetUserName();
            var authorizedUser = await userManager.FindByNameAsync(userName);

            var pets = await context.Pets.Where(p => p.UserId == authorizedUser.Id).ToListAsync();
            var petDto = pets.Select(s => s.ToPetDto());

            return Ok(pets);
        }

        [HttpPost("add-saved-pet/{id:int}")]
        [Authorize]
        public async Task<IActionResult> SavePet([FromRoute] int id)
        {
            var userName = User.GetUserName();
            var authorizedUser = await userManager.FindByNameAsync(userName);

            var userId = authorizedUser.Id;
            var petId = id;

            var userPet = new UserPet{
                UserId = userId,
                PetId = petId
            };

            await context.UserPets.AddAsync(userPet);
            await context.SaveChangesAsync();

            return Ok("Zapisano zwierzę");
        }


    }
}