using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Models;

namespace DotNetApi.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}