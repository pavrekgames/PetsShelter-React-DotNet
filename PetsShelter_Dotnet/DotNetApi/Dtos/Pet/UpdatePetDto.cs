using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.Pet
{
    public class UpdatePetDto
    {
        public string Name {get; set;} = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string Race { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string User_Id { get; set; } = string.Empty;
    }
}