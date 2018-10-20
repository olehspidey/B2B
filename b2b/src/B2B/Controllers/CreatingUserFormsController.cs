using System;
using System.Threading.Tasks;
using AutoMapper;
using B2B.BLL.Services;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.Dtos.User;
using B2B.Extensions;
using B2B.Filters.AuthorizationFilters;
using Microsoft.AspNetCore.Mvc;

namespace B2B.Controllers
{
    [Produces("application/json")]
    [Route("api/userForms")]
    public class CreatingUserFormsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICreatingUserFormsService _creatingUserFormsService;

        public CreatingUserFormsController(IMapper mapper,
            ICreatingUserFormsService creatingUserFormsService)
        {
            _mapper = mapper;
            _creatingUserFormsService = creatingUserFormsService;
        }

        [JwtAuthorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRegistrationForm(int id)
        {
            var registrationUserForm = await _creatingUserFormsService.GetRegistrationFormAsync(id);

            if (registrationUserForm == null)
                return NotFound("Form not found");

            return Ok(_mapper.Map<RegistrationUserForm, RegistrationUserFormDto>(registrationUserForm));
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRegistrationForm([FromBody] CreateRegistrationUserFormDto formDto)
        {
            var mappedForm = _mapper.Map<CreateRegistrationUserFormDto, RegistrationUserForm>(formDto);
            var creationResult = await _creatingUserFormsService.CreateRegistrationUserFormAsync(mappedForm);

            if (creationResult == null)
                throw new ApplicationException("Can't create form");

            return Created(Url.GetEntityByIdUrl(nameof(GetRegistrationForm), "CreatingUserForms", creationResult.Id.ToString(), Request.Scheme), creationResult);
        }
    }
}
