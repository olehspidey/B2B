using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace B2B.Extensions
{
    public static class BearerAuthenticationExtensions
    {
        public static void AddBearerAuthentication(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddCookie()
                .AddJwtBearer(jwtBearerOptions =>
                {
                    jwtBearerOptions.RequireHttpsMetadata = false;
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateActor = bool.Parse(configuration["Token:ValidateActor"]),
                        ValidateAudience = bool.Parse(configuration["Token:ValidateAudience"]),
                        ValidateLifetime = bool.Parse(configuration["Token:ValidateLifetime"]),
                        ValidateIssuerSigningKey = bool.Parse(configuration["Token:ValidateIssuerSigningKey"]),
                        ValidIssuer = configuration["Token:Issuer"],
                        ValidAudience = configuration["Token:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
                            (configuration["Token:Key"]))
                    };
                });
        }
    }
}
