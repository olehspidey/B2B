using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using B2B.BLL.Services;
using B2B.Core.Extensions;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Companies;
using B2B.Core.Models.Dtos.Company;
using B2B.Extensions;
using B2B.Filters.AuthorizationFilters;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace B2B.Controllers
{
    [JwtAuthorize]
    [Produces("application/json")]
    [Route("api/companies")]
    public class CompanyController : ControllerBase
    {
        private readonly IMapper _mapper;
        public CompanyController(IMapper mapper,
            IUserCompanyService userCompanyService,
            UserManager<User> userManager)
        {
            _mapper = mapper;
            _userCompanyService = userCompanyService;
            _userManager = userManager;
        }
        private readonly IUserCompanyService _userCompanyService;
        private readonly UserManager<User> _userManager;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await _userManager.GetByIdentityAsync(this);

            if (user == null)
                return Unauthorized();

            var companies = await _userCompanyService.GetCompaniesAsync(user);

            return Ok(_mapper.Map<IEnumerable<Company>, IEnumerable<CompanyDto>>(companies));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var company = await _userCompanyService.GetCompanyByIdAsync(id);

            return Ok(_mapper.Map<Company, CompanyDto>(company));
        }

        [HttpGet("byCategory/{category:int}")]
        public async Task<IActionResult> GetByCategory(CompanyCategory category)
        {
            var companies = await _userCompanyService.GetByCategoryAsync(category);

            return Ok(_mapper.Map<IEnumerable<Company>, IEnumerable<CompanyDto>>(companies));
        }

        [HttpPost("createCompany")]
        public async Task<IActionResult> CreateCompanyToUser([FromBody] CreateCompanyDto dto)
        {
            var user = await _userManager.GetByIdentityAsync(this);

            if (user == null)
                return Unauthorized();

            var mappedCompany = _mapper.Map<CreateCompanyDto, Company>(dto);
            Company createdCompany;

            try
            {
                createdCompany = await _userCompanyService.AddCompanyToUserAsync(user, mappedCompany);
            }
            catch (ApplicationException e)
            {
                return BadRequest(e.Message);
            }

            if (createdCompany == null)
                return BadRequest("Can't create company");

            return Created(Url.GetEntityByIdUrl(nameof(Get),
                "Company",
                createdCompany.Id.ToString(),
                Request.Scheme),
                _mapper.Map<Company, CompanyDto>(createdCompany));
        }
    }
}
