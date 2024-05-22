using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Core;
using DotNetApi.Dtos.Pet;
using DotNetApi.Models;

namespace DotNetApi.Mappers
{
    public static class PetMappers
    {
        public static PetDto ToPetDto(this Pet pet)
        {
            return new PetDto
            {
                Id = pet.Id,
                Name = pet.Name,
                Species = pet.Species,
                Race = pet.Race,
                Size = pet.Size,
                Description = pet.Description,
                User_Id = pet.User_Id
            };
        }

        public static Pet ToPetFromCreateDto(this CreatePetDto createPetDto, string photoPath)
        {
            return new Pet{
                Name = createPetDto.Name,
                Species = createPetDto.Species,
                Race = createPetDto.Race,
                Size = createPetDto.Size,
                Description = createPetDto.Description,
                Photo_Path = photoPath,
                User_Id = createPetDto.User_Id
            };
        }

    }
}