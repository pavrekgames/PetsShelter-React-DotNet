using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Dtos.SickPet;
using DotNetApi.Models;

namespace DotNetApi.Interfaces
{
    public interface ISickPetRepository
    {
        Task<List<SickPet>> GetSickPetsAsync();
        Task<SickPet?> GetSickPetByIdAsync(int id);
        Task<SickPet> CreateAsync(SickPet pet);
        Task<SickPet?> UpdateAsync(int id, UpdateSickPetDto petDto);
        Task<SickPet?> DeleteAsync(int id);
    }
}