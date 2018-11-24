using System;
using System.Diagnostics;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.DAL.Initializators;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace B2B
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var rolesManager = serviceProvider.GetService<RoleManager<IdentityRole>>();
                var userManager = serviceProvider.GetService<UserManager<User>>();
                var configuration = serviceProvider.GetService<IConfiguration>();

                try
                {
                    await RolesInitializer.Seed(configuration, rolesManager);
                    await UsersInitializer.Seed(configuration, userManager);
                }
                catch (Exception e)
                {
                    Debug.WriteLine(e.Message);
                }
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
