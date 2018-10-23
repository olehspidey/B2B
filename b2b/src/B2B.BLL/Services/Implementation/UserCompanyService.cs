using System;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Companies;
using B2B.Core.Models.DomainModels.Subscriptions;
using B2B.DAL;

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

            if ((!userCompaniesCount.HasValue || userCompaniesCount.Value == 0) && userCompaniesCount < GoldSubscriptionCompaniesCount)
            {
                var insertResult = await _companyRepository.InsertAsync(company);

                return insertResult >= 0 ? null : company;
            }

            if (userCompaniesCount == BaseSubscriptionCompaniesCount && subscriptionType == SubscriptionType.Base)
                throw new ApplicationException($"{SubscriptionType.Base} can have only {BaseSubscriptionCompaniesCount} companies");
            if (userCompaniesCount == LiteSubscriptionCompaniesCount && subscriptionType == SubscriptionType.Lite)
                throw new ApplicationException($"{SubscriptionType.Lite} can have only {LiteSubscriptionCompaniesCount} companies");
            if (userCompaniesCount == GoldSubscriptionCompaniesCount && subscriptionType == SubscriptionType.Gold)
                throw new ApplicationException($"{SubscriptionType.Gold} can have only {GoldSubscriptionCompaniesCount} companies");

            return null;
        }

        public async Task<Company> GetCompanyByIdAsync(int id)
            => await _companyRepository.GetByIdAsync(id);

    }
}
