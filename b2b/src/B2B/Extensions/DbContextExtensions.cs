using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DbContext = B2B.DAL.DbContext;

namespace B2B.Extensions
{
    public static class DbContextExtensions
    {
        public static void AddDbContext(this IServiceCollection serviceCollection, IConfiguration configuration, IHostingEnvironment environment)
        {
            serviceCollection.AddDbContext<DbContext>(builder =>
            {
                builder.UseSqlServer(environment.IsDevelopment()
                    ? configuration.GetConnectionString("DevCon")
                    : configuration.GetConnectionString("ProdCon"));
            });
        }
    }
}
