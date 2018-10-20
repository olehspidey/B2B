using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.DAL;

namespace B2B.BLL.Services.Implementation
{
    public class CreateUserFormsService : ICreatingUserFormsService
    {
        private readonly IRepository<RegistrationUserForm, int> _registrationUserFormRepository;

        public CreateUserFormsService(IRepository<RegistrationUserForm, int> registrationUserFormRepository)
        {
            _registrationUserFormRepository = registrationUserFormRepository;
        }

        public async Task<RegistrationUserForm> GetRegistrationFormAsync(int id)
            => await _registrationUserFormRepository.GetByIdAsync(id);

        public async Task<RegistrationUserForm> CreateRegistrationUserFormAsync(RegistrationUserForm registrationUserForm)
            => await _registrationUserFormRepository
                   .InsertAsync(registrationUserForm) < 0 ? null : registrationUserForm;
    }
}
