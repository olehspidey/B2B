using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.DAL;

namespace B2B.BLL.Services.Implementation
{
    public class UserCompanyService : IUserCompanyService
    {
        private readonly IRepository<Company, int> _companyRepository;

        public UserCompanyService(IRepository<Company, int> companyRepository)
        {
            _companyRepository = companyRepository;
        }

        public async Task<Company> AddCompanyToUserAsync(User user, Company company)
        {
            company.User = user;
            company.UserId = user.Id;

            var insertResult = await _companyRepository.InsertAsync(company);

            return insertResult >= 0 ? null : company;
        }

        public async Task<Company> GetCompanyByIdAsync(int id)
            => await _companyRepository.GetByIdAsync(id);
    }
}
