using B2B.Core.Models.DomainModels;
using B2B.DAL;
using Microsoft.AspNetCore.Identity;

namespace B2B.BLL.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager,
            IRepository<RegistrationUserForm, int> registrationUserFormRepository)
        {
            _userManager = userManager;
        }
    }
}
