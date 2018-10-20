using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.DAL;
using Microsoft.AspNetCore.Identity;

namespace B2B.BLL.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IRepository<RegistrationUserForm, int> _registrationUserFormRepository;

        public UserService(UserManager<User> userManager,
            IRepository<RegistrationUserForm, int> registrationUserFormRepository)
        {
            _userManager = userManager;
            _registrationUserFormRepository = registrationUserFormRepository;
        }

        public async Task<RegistrationUserForm> GetRegistrationFormAsync(int id)
            => await _registrationUserFormRepository.GetByIdAsync(id);

        public async Task<RegistrationUserForm> CreateRegistrationUserFormAsync(RegistrationUserForm registrationUserForm)
            => await _registrationUserFormRepository
                   .InsertAsync(registrationUserForm) < 0 ? null : registrationUserForm;
    }
}
