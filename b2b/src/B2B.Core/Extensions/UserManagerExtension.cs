using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace B2B.Core.Extensions
{
    public static class UserManagerExtension
    {
        public static async Task<TUser> GetByIdentityAsync<TUser>(this UserManager<TUser> userManager, ControllerBase controller)
            where TUser : IdentityUser
        {
            var identityName = controller.User.Identity.Name;

            if (identityName == null)
                return null;

            return await userManager.FindByNameAsync(identityName) ?? await userManager.FindByEmailAsync(identityName);
        }
    }
}
