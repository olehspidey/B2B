using System.Collections.Generic;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels.Companies;

namespace B2B.BLL.Services
{
    public interface IKeyWordService
    {
        Task<ICollection<KeyWord>> GetByWordAsync(string word);
    }
}
