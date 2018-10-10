using Microsoft.AspNetCore.Identity;

namespace B2B.Core.Models.DomainModels
{
    public class User : IdentityUser, IEntity<string>
    {
    }
}
