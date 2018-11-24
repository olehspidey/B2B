using System.Collections.Generic;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.DAL;
using Microsoft.EntityFrameworkCore;

namespace B2B.BLL.Services.Implementation
{
    public class ApplicationFormsService : IApplicationFormsService
    {
        private readonly IRepository<ApplicationForm, int> _applicationFormsRepository;

        public ApplicationFormsService(IRepository<ApplicationForm, int> applicationFormsRepository)
        {
            _applicationFormsRepository = applicationFormsRepository;
        }

        public async Task<ApplicationForm> GetApplicationFormAsync(int id)
            => await _applicationFormsRepository.GetByIdAsync(id);

        public async Task<ApplicationForm> CreateApplicationFormAsync(ApplicationForm applicationForm)
            => await _applicationFormsRepository
                   .InsertAsync(applicationForm) < 0 ? null : applicationForm;

        public async Task<ICollection<ApplicationForm>> GetApplicationFormsAsync()
            => await _applicationFormsRepository
                .Table
                .ToListAsync();

        public async Task<ApplicationForm> RejectAsync(int id)
        {
            var applicationForm = await _applicationFormsRepository.GetByIdAsync(id);

            if (applicationForm == null)
                return null;

            applicationForm.Status = ApplicationFormStatus.Rejected;

            var updatedStatus = await _applicationFormsRepository.UpdateAsync(applicationForm);

            return updatedStatus >= 0 ? applicationForm : null;
        }
    }
}
