using B2B.BLL.Services;
using B2B.BLL.Services.Implementation;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Companies;
using B2B.DAL;
using Microsoft.Extensions.DependencyInjection;

namespace B2B.Extensions
{
    public static class ServicesExtensions
    {
        public static void AddServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IPasswordRandomizerService, PasswordRandomizerService>();
            serviceCollection.AddScoped<IEmailSendService, EmailSendService>();
            serviceCollection.AddScoped<IRepository<User, string>, Repository<User, string>>();
            serviceCollection.AddScoped<IRepository<Company, int>, Repository<Company, int>>();
            serviceCollection.AddScoped<IRepository<ApplicationForm, int>, Repository<ApplicationForm, int>>();
            serviceCollection.AddScoped<IRepository<KeyWord, int>, Repository<KeyWord, int>>();
            serviceCollection.AddScoped<IUserCompanyService, UserCompanyService>();
            serviceCollection.AddScoped<IUserService, UserService>();
            serviceCollection.AddScoped<IApplicationFormsService, ApplicationFormsService>();
            serviceCollection.AddScoped<IKeyWordService, KeyWordService>();
        }
    }
}
