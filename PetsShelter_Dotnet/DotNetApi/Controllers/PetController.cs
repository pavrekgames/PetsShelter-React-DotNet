using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.Pet;
using DotNetApi.Helpers;
using DotNetApi.Interfaces;
using DotNetApi.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Controllers
{
    [ApiController]
    [Route("api/")]
    public class PetController : ControllerBase
    {

        private readonly ApplicationDBContext context;
        private readonly IPetRepository petRepository;
        private readonly ILogger<PetController> logger;

        public PetController(ApplicationDBContext context, IPetRepository petRepository, ILogger<PetController> logger)
        {
            this.context = context;
            this.petRepository = petRepository;
            this.logger = logger;
        }

        [HttpGet("newest-pets")]
        public async Task<IActionResult> GetNewestPets()
        {

            var pets = await context.Pets.OrderByDescending(x => x.Id).Take(3).OrderBy(x => x.Id).ToListAsync();
            var petsDto = pets.Select(s => s.ToPetDto());

            return Ok(pets);
        }

        [HttpGet("pets-to-adopt")]
        public async Task<IActionResult> GetPets()
        {
            var pets = await context.Pets.ToListAsync();
            var petDto = pets.Select(s => s.ToPetDto());

            return Ok(pets);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPetById([FromRoute] int id)
        {
            var pet = await petRepository.GetByIdAsync(id);

            if (pet == null)
            {
                return NotFound();
            }

            return Ok(pet);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePetDto petDto)
        {
            var pet = petDto.ToPetFromCreateDto();

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

    }
}