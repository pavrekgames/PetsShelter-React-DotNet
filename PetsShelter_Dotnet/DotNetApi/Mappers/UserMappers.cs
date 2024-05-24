using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Dtos.Account;
using DotNetApi.Models;

namespace DotNetApi.Mappers
{
    public static class UserMappers
    {
         public static AuthorizedUserDto ToUserDto(this User user)
        {
            return new AuthorizedUserDto
            {
                Id = user.Id,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Role = user.Role,
                Tokens_Count = user.TokensCount
            };
        }
    }
}