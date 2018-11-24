using System;
using System.Collections.Generic;
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

        [JwtAuthorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var applicationForms = await _applicationFormsService.GetApplicationFormsAsync();

            return Ok(_mapper.Map<IEnumerable<ApplicationForm>, IEnumerable<ApplicationFormDto>>(applicationForms));
        }

        [JwtAuthorize(Roles = "Admin")]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetApplicationForm(int id)
        {
            var registrationUserForm = await _applicationFormsService.GetApplicationFormAsync(id);

            if (registrationUserForm == null)
                return NotFound("Form not found");

            return Ok(_mapper.Map<ApplicationForm, ApplicationFormDto>(registrationUserForm));
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateApplicationForm([FromBody] CreateApplicationFormDto formDto)
        {
            var mappedForm = _mapper.Map<CreateApplicationFormDto, ApplicationForm>(formDto);
            var creationResult = await _applicationFormsService.CreateApplicationFormAsync(mappedForm);

            if (creationResult == null)
                throw new ApplicationException("Can't create form");

            return Created(Url.GetEntityByIdUrl(nameof(GetApplicationForm), "ApplicationForms", creationResult.Id.ToString(), Request.Scheme), creationResult);
        }
    }
}
