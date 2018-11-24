using System.Threading.Tasks;

namespace B2B.BLL.Services
{
    public interface IEmailSendService
    {
        Task<bool> SendAsync(string email, string subject, string message);
    }
}
