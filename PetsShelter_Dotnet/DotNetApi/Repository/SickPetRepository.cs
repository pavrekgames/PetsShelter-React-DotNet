using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.SickPet;
using DotNetApi.Interfaces;
using DotNetApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Repository
{
    public class SickPetRepository : ISickPetRepository
    {

        private readonly ApplicationDBContext context;

        public SickPetRepository(ApplicationDBContext context)
        {
            this.context = context;
        }

        public async Task<List<SickPet>> GetSickPetsAsync()
        {
            var pets = await context.SickPets.ToListAsync();

            return pets;
        }

        public Task<SickPet?> GetSickPetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<SickPet> CreateAsync(SickPet pet)
        {
            await context.SickPets.AddAsync(pet);
            await context.SaveChangesAsync();
            return pet;
        }

        public Task<SickPet?> UpdateAsync(int id, UpdateSickPetDto petDto)
        {
            throw new NotImplementedException();
        }

        public Task<SickPet?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

    }
}