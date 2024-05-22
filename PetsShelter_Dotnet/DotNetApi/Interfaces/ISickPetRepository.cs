using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Models;

namespace DotNetApi.Interfaces
{
    public interface ISickPetRepository
    {
        Task<List<SickPet>> GetSickPetsAsync();
        Task<SickPet?> GetSickPetByIdAsync(int id);
        Task<SickPet> CreateAsync(Pet pet);
        //Task<SickPet?> UpdateAsync(int id, UpdatePetDto petDto);
        Task<SickPet?> DeleteAsync(int id);
    }
}