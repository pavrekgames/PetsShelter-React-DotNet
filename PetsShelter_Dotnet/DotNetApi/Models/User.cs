using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace DotNetApi.Models
{
  public class User : IdentityUser
  {
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public int TokensCount { get; set; } = 0;
    public List<Pet> Pets { get; set; } = new List<Pet>();
    public List<UserPet> UserPets { get; set; } = new List<UserPet>();
  }
}