using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Dtos.SickPet;
using DotNetApi.Models;

namespace DotNetApi.Mappers
{
    public static class SickPetMappers
    {
        public static SickPetDto ToSickPetDto(this SickPet pet)
        {
            return new SickPetDto
            {
                Id = pet.Id,
                Name = pet.Name,
                Species = pet.Species,
                Disease = pet.Disease,
                CurrentTokens = pet.CurrentTokens,
                RequiredTokens = pet.RequiredTokens,
                Status = pet.Status,
                PhotoPath = pet.PhotoPath
            };
        }

        public static SickPet ToSickPetFromCreateDto(this CreateSickPetDto createSickPetDto, string photoPath)
        {
            return new SickPet
            {
                Name = createSickPetDto.Name,
                Species = createSickPetDto.Species,
                Disease = createSickPetDto.Disease,
                RequiredTokens = createSickPetDto.RequiredTokens,
                PhotoPath = photoPath
            };
        }
    }
}