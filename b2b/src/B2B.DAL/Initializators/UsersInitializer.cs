using System;
using System.Linq;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Subscriptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace B2B.DAL.Initializators
{
    public static class UsersInitializer
    {
        public static async Task Seed(IConfiguration configuration, UserManager<User> userManager)
        {
            if (userManager.Users.Any())
                return;

            var admin = new User
            {
                UserName = configuration["Users:Admin:UserName"],
                Email = configuration["Users:Admin:Email"],
                Name = configuration["Users:Admin:Name"],
                LastName = configuration["Users:Admin:LastName"]
            };
            var user = new User
            {
                UserName = configuration["Users:User:UserName"],
                Email = configuration["Users:User:Email"],
                Name = configuration["Users:User:Name"],
                LastName = configuration["Users:User:LastName"],
                Subscription = new Subscription
                {
                    End = DateTime.UtcNow.AddDays(30), SubscriptionType = SubscriptionType.Gold
                }
            };
            user.Subscription.User = user;

            await userManager.CreateAsync(admin, configuration["Users:Admin:Password"]);
            await userManager.CreateAsync(user, configuration["Users:User:Password"]);
            await userManager.AddToRoleAsync(admin, configuration["Roles:Admin"]);
            await userManager.AddToRoleAsync(user, configuration["Roles:User"]);
        }
    }
}
