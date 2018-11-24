using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace B2B.BLL.Services.Implementation
{
    public class EmailSendService : IEmailSendService
    {
        private readonly SmtpClient _smtpClient;
        private readonly IConfiguration _configuration;

        public NetworkCredential Credential { get; set; }

        public EmailSendService(IConfiguration configuration)
        {
            _configuration = configuration;
            _smtpClient = new SmtpClient(configuration["EmailCredential:Host"], int.Parse(configuration["EmailCredential:Port"]))
            {
                EnableSsl = true
            };
            Credential = new NetworkCredential(configuration["EmailCredential:Email"], configuration["EmailCredential:Password"]);
            _smtpClient.Credentials = Credential;
        }

        public async Task<bool> SendAsync(string emailTo, string subject, string message)
        {
            try
            {
                var mailMessage = new MailMessage(_configuration["EmailCredential:Email"], emailTo, subject, message)
                {
                    IsBodyHtml = true
                };

                await _smtpClient.SendMailAsync(mailMessage);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
