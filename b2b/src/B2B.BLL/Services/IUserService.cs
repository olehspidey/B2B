using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;

namespace B2B.BLL.Services
{
    public interface IUserService
    {
        Task<User> CreateUserFromFormAsync(int formId);
    }
}
