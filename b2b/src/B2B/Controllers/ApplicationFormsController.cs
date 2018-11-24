using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using B2B.BLL.Services;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.Dtos.ApplicationForm;
using B2B.Core.Models.Dtos.User;
using B2B.Extensions;
using B2B.Filters.AuthorizationFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace B2B.Controllers
{
    [JwtAuthorize(Roles = "Admin")]
    [Produces("application/json")]
    [Route("api/applicationForms")]
    public class ApplicationFormsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IApplicationFormsService _applicationFormsService;

        public ApplicationFormsController(IMapper mapper,
            IApplicationFormsService applicationFormsService)
        {
            _mapper = mapper;
            _applicationFormsService = applicationFormsService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var applicationForms = await _applicationFormsService.GetApplicationFormsAsync();

            return Ok(_mapper.Map<IEnumerable<ApplicationForm>, IEnumerable<ApplicationFormDto>>(applicationForms));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetApplicationForm(int id)
        {
            var registrationUserForm = await _applicationFormsService.GetApplicationFormAsync(id);

            if (registrationUserForm == null)
                return NotFound("Form not found");

            return Ok(_mapper.Map<ApplicationForm, ApplicationFormDto>(registrationUserForm));
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> CreateApplicationForm([FromBody] CreateApplicationFormDto formDto)
        {
            var mappedForm = _mapper.Map<CreateApplicationFormDto, ApplicationForm>(formDto);
            var creationResult = await _applicationFormsService.CreateApplicationFormAsync(mappedForm);

            if (creationResult == null)
                BadRequest("Can't create form");

            return Created(Url.GetEntityByIdUrl(nameof(GetApplicationForm), "ApplicationForms", creationResult.Id.ToString(), Request.Scheme), creationResult);
        }

        [HttpPut("reject")]
        public async Task<IActionResult> Reject([FromBody] RejectApplicationFormDto dto)
        {
            var rejectedApplicationForm = await _applicationFormsService.RejectAsync(dto.Id);

            if (rejectedApplicationForm == null)
                return BadRequest("Can't reject application form");

            return Ok(_mapper.Map<ApplicationForm, ApplicationFormDto>(rejectedApplicationForm));
        }
    }
}
