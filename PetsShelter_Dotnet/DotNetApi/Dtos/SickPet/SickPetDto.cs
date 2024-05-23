using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.SickPet
{
    public class SickPetDto
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string Disease { get; set; } = string.Empty;
        public int CurrentTokens {get; set;} = 0;
        public int RequiredTokens {get; set;} = 1;
        public string Status { get; set; } = "Aktywne";
        public string PhotoPath { get; set; } = string.Empty;
    }
}