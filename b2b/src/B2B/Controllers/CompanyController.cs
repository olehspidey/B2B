using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IUserCompanyService _userCompanyService;
        private readonly IKeyWordService _keyWordService;
        private readonly UserManager<User> _userManager;

        public CompanyController(IMapper mapper,
            IUserCompanyService userCompanyService,
            UserManager<User> userManager,
            IKeyWordService keyWordService)
        {
            _mapper = mapper;
            _userCompanyService = userCompanyService;
            _userManager = userManager;
            _keyWordService = keyWordService;
        }

        #region GET

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await _userManager.GetByIdentityAsync(this);

            if (user == null)
                return Unauthorized();

            var companies = await _userCompanyService.GetCompaniesAsync(user);

            return Ok(_mapper.Map<IEnumerable<Company>, IEnumerable<CompanyDto>>(companies));
        }

        [HttpGet("{id:int}/{edit?}/{moveToSuggests?}")]
        public async Task<IActionResult> Get(int id, bool edit = false, bool moveToSuggests = false)
        {
            var user = await _userManager.GetByIdentityAsync(this);

            if (user == null)
                return Unauthorized();

            var company = await _userCompanyService.GetCompanyByIdAsync(id);

            if (company == null)
                return NotFound($"Company with id: {id} was not found");

            var mappedCompany = _mapper.Map<Company, CompanyDto>(company);

            if (company.User.Id != user.Id)
            {
                if (!company.Suggestion)
                    return NotFound();

                if (edit || moveToSuggests)
                    return StatusCode(403);

                mappedCompany.CanEdit = false;
                mappedCompany.CanMoveToSuggests = false;
            }
            else
            {
                mappedCompany.CanEdit = true;
                mappedCompany.CanMoveToSuggests = true;
            }

            return Ok(mappedCompany);
        }

        [HttpGet("{s}/{companyCategory}/{countryId}/{cityId}")]
        public async Task<IActionResult> GetByFilter(string s = null, CompanyCategory? companyCategory = null, string countryId = null, string cityId = null)
        {
            var companies = await _userCompanyService.GetByFiltersAsync(s, companyCategory, countryId, cityId);

            return Ok(_mapper.Map<IEnumerable<Company>, IEnumerable<CompanyDto>>(companies));
        }

        [HttpGet("byCategory/{category:int}")]
        public async Task<IActionResult> GetByCategory(CompanyCategory category)
        {
            var companies = await _userCompanyService.GetByCategoryAsync(category);

            return Ok(_mapper.Map<IEnumerable<Company>, IEnumerable<CompanyDto>>(companies));
        }

        [HttpGet("keyWords/{word}")]
        public async Task<IActionResult> GetKeyWordsByWord(string word)
        {
            if (string.IsNullOrWhiteSpace(word))
                return BadRequest("Invalid word");

            var keyWords = await _keyWordService.GetByWordAsync(word);

            return Ok(_mapper.Map<IEnumerable<KeyWord>, IEnumerable<KeyWordDto>>(keyWords));
        }

        #endregion

        #region POST

        [HttpPost("createCompany")]
        public async Task<IActionResult> CreateCompanyToUser([FromBody] CreateCompanyDto dto)
        {
            var user = await _userManager.GetByIdentityAsync(this);

            if (user == null)
                return Unauthorized();

            var mappedCompany = _mapper.Map<CreateCompanyDto, Company>(dto);
            var createdCompany = await _userCompanyService.AddCompanyToUserAsync(user, mappedCompany);

            if (createdCompany == null)
                return BadRequest("Can't create company");

            return Created(Url.GetEntityByIdUrl(nameof(Get),
                "Company",
                createdCompany.Id.ToString(),
                Request.Scheme),
                _mapper.Map<Company, CompanyDto>(createdCompany));
        }

        #endregion

        #region PUT

        [HttpPut("edit")]
        public async Task<IActionResult> Edit([FromBody] EditCompanyDto companyDto)
        {
            var user = await _userManager.GetByIdentityAsync(this);

            if (user == null)
                return Unauthorized();

            var selectedCompany = await _userCompanyService.GetCompanyByIdAsync(companyDto.Id);
            var mappedCompany = MapEdit(selectedCompany, companyDto);

            var userCompaniesIds = user
                .Companies
                .Select(x => x.Id)
                .ToList();

            if (userCompaniesIds.Any() && userCompaniesIds.Contains(mappedCompany.Id))
            {
                var updatedCompany = await _userCompanyService.EditCompanyAsync(mappedCompany, user);

                if (updatedCompany == null)
                    return BadRequest("Can't update company");

                return Ok(_mapper.Map<Company, CompanyDto>(updatedCompany));
            }

            return StatusCode(403);
        }

        [HttpPut("addKeyWords")]
        public async Task<IActionResult> AddKeyWords([FromBody] AddKeyWordsDto wordsDto)
        {
            var companyResult = await _userCompanyService.AddKeyWordsAsync(wordsDto.Id, wordsDto.Words);

            if (companyResult == null)
                return BadRequest($"Can't update company with id {wordsDto.Id}");

            return Ok(_mapper.Map<Company, CompanyDto>(companyResult));
        }

        [HttpPut("addToSuggest")]
        public async Task<IActionResult> AddToSuggests([FromBody] AddToSuggestsDto suggestsDto)
        {
            var user = await _userManager.GetByIdentityAsync(this);

            if (user == null)
                return Unauthorized();
            Company company;

            try
            {
                company = await _userCompanyService.CreateSuggestionAsync(suggestsDto.Id, user);
            }
            catch (ApplicationException e)
            {
                return BadRequest(e.Message);
            }

            if (company == null)
                return BadRequest("Can't create suggestion");

            return Ok(_mapper.Map<Company, CompanyDto>(company));
        }

        #endregion

        private static Company MapEdit(Company company, EditCompanyDto companyDto)
        {
            company.Address.City = companyDto.Address.City;
            company.Address.CityId = companyDto.Address.CityId;
            company.Address.Country = companyDto.Address.Country;
            company.Address.CountryId = companyDto.Address.CountryId;
            company.Description = companyDto.Description;
            company.FullName = companyDto.FullName;
            company.ShortName = companyDto.ShortName;
            company.Category = companyDto.Category;
            company.Owner.Email = companyDto.Owner.Email;
            company.Owner.Name = companyDto.Owner.Name;
            company.Owner.LastName = companyDto.Owner.LastName;
            company.Owner.PersonType = companyDto.Owner.PersonType;

            return company;
        }
    }
}
