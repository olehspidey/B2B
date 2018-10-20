using System;
using System.Threading.Tasks;
using AutoMapper;
using B2B.BLL.Services;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.Dtos.User;
using B2B.Extensions;
using B2B.Filters.AuthorizationFilters;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace B2B.Controllers
{
    [Produces("application/json")]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserController(IUserService userService,
            UserManager<User> userManager,
            IMapper mapper)
        {
            _userService = userService;
            _userManager = userManager;
            _mapper = mapper;
        }

        #region GET

        [JwtAuthorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound("User not found");

            return Ok(_mapper.Map<User, UserDto>(user));
        }

        [JwtAuthorize(Roles = "Admin")]
        [HttpGet("registrationForm/{id:int}")]
        public async Task<IActionResult> GetRegistrationForm(int id)
        {
            var registrationUserForm = await _userService.GetRegistrationFormAsync(id);

            if (registrationUserForm == null)
                return NotFound("Form not found");

            return Ok(_mapper.Map<RegistrationUserForm, RegistrationUserFormDto>(registrationUserForm));
        }

        [JwtAuthorize(Roles = "Admin")]
        [HttpGet("confirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
                return BadRequest("Can't confirm email. User id or code is empty");

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest("User with this email don't exist");

            var result = await _userManager.ConfirmEmailAsync(user, token);

            return Ok(result.Succeeded ? "Email confirmed" : "Error: incorrect token");
        }

        #endregion

        #region POST

        [HttpPost("createRegistrationForm")]
        public async Task<IActionResult> CreateRegistrationForm([FromBody] CreateRegistrationUserFormDto formDto)
        {
            var mappedForm = _mapper.Map<CreateRegistrationUserFormDto, RegistrationUserForm>(formDto);
            var creationResult = await _userService.CreateRegistrationUserFormAsync(mappedForm);

            if (creationResult == null)
                throw new ApplicationException("Can't create form");

            return Created(Url.GetEntityByIdUrl(nameof(GetRegistrationForm), "User", creationResult.Id.ToString(), Request.Scheme), creationResult);
        }

        #endregion
    }
}
