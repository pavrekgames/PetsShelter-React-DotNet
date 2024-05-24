using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Data;
using DotNetApi.Dtos.Pet;
using DotNetApi.Helpers;
using DotNetApi.Interfaces;
using DotNetApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetApi.Repository
{
    public class PetRepository : IPetRepository
    {

        private readonly ApplicationDBContext context;

        public PetRepository(ApplicationDBContext context)
        {
            this.context = context;
        }

        public async Task<List<Pet>> GetPetsAsync(QueryObject query)
        {
            var pets = context.Pets.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                pets = pets.Where(p => p.Name.Contains(query.Name));
            }

            if (!string.IsNullOrWhiteSpace(query.Species))
            {
                pets = pets.Where(p => p.Species.Contains(query.Species));
            }

            if (!string.IsNullOrWhiteSpace(query.Race))
            {
                pets = pets.Where(p => p.Race.Contains(query.Race));
            }

            if (!string.IsNullOrWhiteSpace(query.Size))
            {
                pets = pets.Where(p => p.Size.Contains(query.Size));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    pets = query.IsDescending ? pets.OrderByDescending(p => p.Name) : pets.OrderBy(p => p.Name);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await pets.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Pet?> GetByIdAsync(int id)
        {
            return await context.Pets.FindAsync(id);
        }

        public async Task<Pet> CreateAsync(Pet pet)
        {
            await context.Pets.AddAsync(pet);
            await context.SaveChangesAsync();
            return pet;
        }

        public async Task<Pet?> UpdateAsync(int id, UpdatePetDto petDto)
        {
            var pet = await context.Pets.FirstOrDefaultAsync(x => x.Id == id);

            if (pet == null)
            {
                return null;
            }

            pet.Name = petDto.Name;
            pet.Species = petDto.Species;
            pet.Race = petDto.Race;
            pet.Size = petDto.Size;
            pet.Description = petDto.Description;
            pet.UserId = petDto.UserId;

            await context.SaveChangesAsync();
            return pet;
        }

        public async Task<Pet?> DeleteAsync(int id)
        {
            var pet = await context.Pets.FirstOrDefaultAsync(x => x.Id == id);

            if (pet == null)
            {
                return null;
            }

            context.Pets.Remove(pet);
            await context.SaveChangesAsync();
            return pet;
        }


    }
}