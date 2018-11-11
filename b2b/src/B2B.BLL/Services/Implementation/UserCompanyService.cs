using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Companies;
using B2B.Core.Models.DomainModels.Subscriptions;
using B2B.DAL;
using Microsoft.EntityFrameworkCore;

namespace B2B.BLL.Services.Implementation
{
    public class UserCompanyService : IUserCompanyService
    {
        private readonly IRepository<Company, int> _companyRepository;
        private const int BaseSubscriptionCompaniesCount = 3;
        private const int LiteSubscriptionCompaniesCount = 8;
        private const int GoldSubscriptionCompaniesCount = 15;

        public UserCompanyService(IRepository<Company, int> companyRepository)
        {
            _companyRepository = companyRepository;
        }

        public async Task<Company> AddCompanyToUserAsync(User user, Company company)
        {
            company.User = user;
            company.UserId = user.Id;

            return await InsertCompanyAsync(company);
        }

        public async Task<ICollection<Company>> GetCompaniesAsync(User user)
            => await _companyRepository
                .Table
                .Where(company => company.User.Id == user.Id)
                .ToListAsync();

        public async Task<Company> GetCompanyByIdAsync(int id)
            => await _companyRepository.GetByIdAsync(id);

        public async Task<ICollection<Company>> GetByCategoryAsync(CompanyCategory category)
            => await _companyRepository
                .Table
                .Where(company => company.User.Subscription.End >= DateTime.Now
                                  && company.Category == category)
                .ToListAsync();

        public async Task<Company> CreateSuggestionAsync(int companyId, User user)
        {
            var company = await _companyRepository.GetByIdAsync(companyId);

            if (company == null)
                return null;

            if (company.Suggestion)
                throw new ApplicationException("This company olready is suggestion");

            var suggestionsCount = _companyRepository
                .Table
                .Count(x => x.Suggestion);
            var subscriptionType = user
                .Subscription
                .SubscriptionType;

            if (subscriptionType == SubscriptionType.Base && suggestionsCount == BaseSubscriptionCompaniesCount)
                throw new ApplicationException($"{SubscriptionType.Base} can have only {BaseSubscriptionCompaniesCount} company suggestions");
            if (subscriptionType == SubscriptionType.Lite && suggestionsCount == LiteSubscriptionCompaniesCount)
                throw new ApplicationException($"{SubscriptionType.Lite} can have only {LiteSubscriptionCompaniesCount} company suggestions");
            if (subscriptionType == SubscriptionType.Gold && suggestionsCount == GoldSubscriptionCompaniesCount)
                throw new ApplicationException($"{SubscriptionType.Gold} can have only {GoldSubscriptionCompaniesCount} company suggestions");

            company.Suggestion = true;

            return await _companyRepository.UpdateAsync(company) >= 0 ? company : null;

        }

        public async Task<ICollection<Company>> GetByFiltersAsync(string s, CompanyCategory? companyCategory, string countryId, string cityId)
        {
            var companies = _companyRepository
                .Table
                .Where(x => x.Suggestion &&
                            x.User.Subscription.End.Value > DateTime.UtcNow);

            if (s != null && await companies.AnyAsync())
                companies = companies
                    .Where(x => x.Description.Contains(s));

            if (companyCategory != null && await companies.AnyAsync())
                companies = companies
                    .Where(x => x.Category == companyCategory);

            if (countryId != null && await companies.AnyAsync())
                companies = companies
                    .Where(x => x.Address.CountryId == countryId);

            if (cityId != null && await companies.AnyAsync())
                companies = companies
                    .Where(x => x.Address.CityId == cityId);

            return await companies.ToListAsync();
        }

        private async Task<Company> InsertCompanyAsync(Company company)
            => await _companyRepository.InsertAsync(company) >= 0 ? company : null;
    }
}
