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
        }
    }
}
