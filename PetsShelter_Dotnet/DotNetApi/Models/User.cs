using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace DotNetApi.Models
{
  public class User : IdentityUser
  {
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
    public int TokensCount { get; set; } = 0;
    [JsonIgnore]
    public List<Pet> Pets { get; set; } = new List<Pet>();
    [JsonIgnore]
    public List<UserPet> UserPets { get; set; } = new List<UserPet>();
  }
}