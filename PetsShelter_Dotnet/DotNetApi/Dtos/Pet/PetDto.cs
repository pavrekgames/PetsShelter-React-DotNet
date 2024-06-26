using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.Pet
{
    public class PetDto
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string Race { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string Photo_Path { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}