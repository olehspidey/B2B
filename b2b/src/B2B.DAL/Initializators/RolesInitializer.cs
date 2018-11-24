using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace B2B.DAL.Initializators
{
    public static class RolesInitializer
    {
        public static async Task Seed(IConfiguration configuration, RoleManager<IdentityRole> roleManager)
        {
            if (roleManager.Roles.Any())
                return;

            await roleManager.CreateAsync(new IdentityRole
            {
                Name = configuration["Roles:Admin"]
            });
            await roleManager.CreateAsync(new IdentityRole
            {
                Name = configuration["Roles:User"]
            });
        }
    }
}
