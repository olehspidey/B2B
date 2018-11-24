using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace B2B.Filters.AuthorizationFilters
{
    public class JwtAuthorizeAttribute : AuthorizeAttribute
    {
        public JwtAuthorizeAttribute()
        {
            AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme;
        }
    }
}
