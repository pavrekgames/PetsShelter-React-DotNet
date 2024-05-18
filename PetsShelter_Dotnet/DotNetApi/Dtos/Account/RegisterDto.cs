using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.Account
{
    public class RegisterDto
    {
        [Required(ErrorMessage ="Imię jest wymagane")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage ="Nazwisko jest wymagane")]
        public string Surname { get; set; } = string.Empty;

        [Required(ErrorMessage ="Adres E-mail jest wymagany")]
        [EmailAddress(ErrorMessage ="Wprowadzony E-mail jest niepoprawny")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage ="Adres E-mail jest wymagane")]
        [EmailAddress(ErrorMessage ="Wprowadzony E-mail jest niepoprawny")]
        public string UserName { get; set; } = string.Empty;

        [Required(ErrorMessage ="Hasło jest wymagane")]
        public string Password { get; set; } = string.Empty;

    }
}