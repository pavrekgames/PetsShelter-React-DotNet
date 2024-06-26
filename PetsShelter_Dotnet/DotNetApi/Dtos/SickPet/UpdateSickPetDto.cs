using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.SickPet
{
    public class UpdateSickPetDto
    {
        [Required(ErrorMessage = "Imię jest wymagane")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = "Gatunek jest wymagany")]
        [MinLength(3, ErrorMessage = "Gatunek musi mieć minimum 3 znaki")]
        public string Species { get; set; } = string.Empty;
        [Required(ErrorMessage = "Nazwa choroby jest wymagana")]
        [MinLength(3, ErrorMessage = "Nazwa choroby musi mieć minimum 3 znaki")]
        public string Disease { get; set; } = string.Empty;
        [Required(ErrorMessage = "Ilość tokenów jest wymagana")]
        public int RequiredTokens { get; set; } = 1;
    }
}