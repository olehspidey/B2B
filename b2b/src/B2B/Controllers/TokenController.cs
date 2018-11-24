using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.Dtos.Token;
using B2B.Core.Models.Dtos.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace B2B.Controllers
{
    [Produces("application/json")]
    [Route("api/token")]
    public class TokenController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly string _tokenIssuer,
            _tokenAudience,
            _tokenLifetime,
            _tokenKey;

        public TokenController(IConfiguration configuration,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenIssuer = configuration["Token:Issuer"];
            _tokenAudience = configuration["Token:Audience"];
            _tokenLifetime = configuration["Token:Lifetime"];
            _tokenKey = configuration["Token:Key"];
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] LoginUserDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.UserName) ?? await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
                return NotFound("User with this login has not been found");

            var singInRes = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (!singInRes.Succeeded)
                return Unauthorized();

            var userRoles = await _userManager.GetRolesAsync(user);

            var jwt = new JwtSecurityToken(
                issuer: _tokenIssuer,
                audience: _tokenAudience,
                notBefore: DateTime.UtcNow,
                claims: GetIdentity(model.UserName, userRoles).Claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(double.Parse(_tokenLifetime))),
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenKey)), SecurityAlgorithms.HmacSha256));

            return Ok(new TokenDto { AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt) });
        }

        private static ClaimsIdentity GetIdentity(string userName, IEnumerable<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }
    }
}
