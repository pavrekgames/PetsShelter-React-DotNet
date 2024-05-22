using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.Pet
{
    public class CreatePetDto
    {
        [Required(ErrorMessage ="Imię jest wymagane")]
        [MinLength(3, ErrorMessage ="Imię musi mieć minimum 3 znaki")]
        public string Name {get; set;} = string.Empty;
        [Required(ErrorMessage ="Gatunek jest wymagany")]
        public string Species { get; set; } = string.Empty;
        [Required(ErrorMessage ="Rasa jest wymagana")]
        public string Race { get; set; } = string.Empty;
        [Required(ErrorMessage ="Rozmiar jest wymagany")]
        public string Size { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        [Required(ErrorMessage ="Zdjęcie jest wymagane")]
        public IFormFile Photo { get; set; }
        [Required]
        public string User_Id { get; set; } = string.Empty; 
    }
}