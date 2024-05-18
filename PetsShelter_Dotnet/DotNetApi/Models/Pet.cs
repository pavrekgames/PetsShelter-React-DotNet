using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetApi.Models
{
    public class Pet
    {
        public int Id {get; set;}
        public string Name {get; set;} = string.Empty;
        public string Species { get; set; } = string.Empty;
        public string Race { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Photo_Path { get; set; } = string.Empty;

        public User User { get; set; } = new User();
        public string User_Id { get; set; } = string.Empty;
        public List<UserPet> UserPets { get; set; } = new List<UserPet>();
    }
}