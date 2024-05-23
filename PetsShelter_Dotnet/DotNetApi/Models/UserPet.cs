using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DotNetApi.Models
{
    public class UserPet
    {
        [JsonIgnore]
        public User User { get; set; } = new User();
        public string User_Id { get; set; } = string.Empty;
        [JsonIgnore]
        public Pet Pet { get; set; } = new Pet();
        public int Pet_Id { get; set; }
    }
}