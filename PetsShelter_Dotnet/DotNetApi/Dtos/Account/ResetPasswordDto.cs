using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Dtos.Account
{
    public class ResetPasswordDto
    {
        [Required(ErrorMessage = "Imię jest wymagane")]
        public string Name { get; set; }
        [Required(ErrorMessage = "E-mail jest wymagany")]
        [EmailAddress(ErrorMessage = "Wpisz poprawny adreas E-mail")]
        public string Email { get; set; }
    }
}