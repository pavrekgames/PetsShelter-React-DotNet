using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.Account
{
    public class UpdateUserDto
    {
        [Required(ErrorMessage = "Imię jest wymagane")]
        public string Name { get; set; } = string.Empty;
        [Required(ErrorMessage = "Nazwisko jest wymagane")]
        public string Surname { get; set; } = string.Empty;
    }
}