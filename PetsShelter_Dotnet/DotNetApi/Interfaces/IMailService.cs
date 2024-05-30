using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Mail;

namespace DotNetApi.Interfaces
{
    public interface IMailService
    {
        Task<bool> SendMailAsync(MailData mailData);
    }
}