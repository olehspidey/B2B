using System;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Subscriptions;
using B2B.DAL;
using Microsoft.AspNetCore.Identity;

namespace B2B.BLL.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IRepository<RegistrationUserForm, int> _registrationUserFormRepository;
        private readonly IPasswordRandomizerService _passwordRandomizerService;

        public UserService(UserManager<User> userManager,
            IRepository<RegistrationUserForm, int> registrationUserFormRepository,
            IPasswordRandomizerService passwordRandomizerService)
        {
            _userManager = userManager;
            _registrationUserFormRepository = registrationUserFormRepository;
            _passwordRandomizerService = passwordRandomizerService;
        }

        public async Task<User> CreateUserFromFormAsync(int formId)
        {
            var userForm = await _registrationUserFormRepository.GetByIdAsync(formId);

            if (userForm == null)
                throw new ApplicationException("Not found user form");

            var user = GetUserFromForm(userForm);
            var creatingResult = await _userManager
                .CreateAsync(user, _passwordRandomizerService.GetRandomPassword(2, 6));

            if (!creatingResult.Succeeded)
                return null;

            return user;
        }

        private static User GetUserFromForm(RegistrationUserForm userForm)
        {
            var user = new User
            {
                Name = userForm.Name,
                LastName = userForm.LastName,
                Email = userForm.Email,
                PhoneNumber = userForm.PhoneNumber,
                Subscription = new Subscription
                {
                    SubscriptionType = userForm.SubscriptionType,
                    End = DateTime.UtcNow.AddDays(30)
                }
            };
            user.UserName = user.Id;
            user.Subscription.UserId = user.Id;

            return user;
        }
    }
}
