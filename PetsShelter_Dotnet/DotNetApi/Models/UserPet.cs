using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Models
{
    public class UserPet
    {
        public User User { get; set; } = new User();
        public string User_Id { get; set; } = string.Empty;
        public Pet Pet { get; set; } = new Pet();
        public int Pet_Id { get; set; }
    }
}