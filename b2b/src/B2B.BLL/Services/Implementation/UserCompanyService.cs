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
            var subscriptionType = user.Subscription.SubscriptionType;
            var userCompaniesCount = user.Companies?.Count;

            company.User = user;
            company.UserId = user.Id;

            if ((!userCompaniesCount.HasValue || userCompaniesCount.Value == 0) &&
                userCompaniesCount < GoldSubscriptionCompaniesCount)
                return await InsertCompanyAsync(company);

            if (userCompaniesCount == BaseSubscriptionCompaniesCount && subscriptionType == SubscriptionType.Base)
                throw new ApplicationException($"{SubscriptionType.Base} can have only {BaseSubscriptionCompaniesCount} companies");
            if (userCompaniesCount == LiteSubscriptionCompaniesCount && subscriptionType == SubscriptionType.Lite)
                throw new ApplicationException($"{SubscriptionType.Lite} can have only {LiteSubscriptionCompaniesCount} companies");
            if (userCompaniesCount == GoldSubscriptionCompaniesCount && subscriptionType == SubscriptionType.Gold)
                throw new ApplicationException($"{SubscriptionType.Gold} can have only {GoldSubscriptionCompaniesCount} companies");

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

        private async Task<Company> InsertCompanyAsync(Company company)
            => await _companyRepository.InsertAsync(company) >= 0 ? company : null;
    }
}
