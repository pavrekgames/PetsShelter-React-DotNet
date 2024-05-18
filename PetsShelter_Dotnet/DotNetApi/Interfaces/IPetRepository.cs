using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Dtos.Pet;
using DotNetApi.Helpers;
using DotNetApi.Models;

namespace DotNetApi.Interfaces
{
    public interface IPetRepository
    {
        Task<List<Pet>> GetPetsAsync(QueryObject query);
        Task<Pet?> GetByIdAsync(int id);
        Task<Pet> CreateAsync(Pet pet);
        Task<Pet?> UpdateAsync(int id, UpdatePetDto petDto);
        Task<Pet?> DeleteAsync(int id);
    }
}