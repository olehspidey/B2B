using System.Collections.Generic;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;

namespace B2B.BLL.Services
{
    public interface IApplicationFormsService
    {
        Task<ApplicationForm> GetApplicationFormAsync(int id);

        Task<ApplicationForm> CreateApplicationFormAsync(ApplicationForm applicationForm);

        Task<ICollection<ApplicationForm>> GetApplicationFormsAsync();
    }
}
