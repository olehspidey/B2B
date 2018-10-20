using B2B.BLL.Services;
using B2B.BLL.Services.Implementation;
using B2B.Core.Models.DomainModels;
using B2B.DAL;
using Microsoft.Extensions.DependencyInjection;

namespace B2B.Extensions
{
    public static class ServicesExtensions
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IRepository<User, string>, Repository<User, string>>();
            serviceCollection.AddScoped<IRepository<RegistrationUserForm, int>, Repository<RegistrationUserForm, int>>();
            serviceCollection.AddScoped<IUserService, UserService>();
            serviceCollection.AddScoped<ICreatingUserFormsService, CreateUserFormsService>();
        }
    }
}
