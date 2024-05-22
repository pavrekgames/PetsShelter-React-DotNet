using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Interfaces;
using DotNetApi.Models;

namespace DotNetApi.Repository
{
    public class SickPetRepository : ISickPetRepository
    {
        public Task<SickPet> CreateAsync(Pet pet)
        {
            throw new NotImplementedException();
        }

        public Task<SickPet?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<SickPet?> GetSickPetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<SickPet>> GetSickPetsAsync()
        {
            throw new NotImplementedException();
        }
    }
}