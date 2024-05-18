using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DotNetApi.Dtos.Account
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Adres E-mail jest wymagany")]
        [EmailAddress(ErrorMessage = "Wprowadzony E-mail jest niepoprawny")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Hasło jest wymagane")]
        public string Password { get; set; } = string.Empty;
    }
}