using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetApi.Mail;
using DotNetApi.Models;

namespace DotNetApi.Interfaces
{
    public interface IMailService
    {
        Task<bool> SendMailAsync(MailData mailData);

        MailData ResetPasswordMail(string newPassword, User user);
    }
}