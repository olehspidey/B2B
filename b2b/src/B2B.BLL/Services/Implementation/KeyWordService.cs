using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels.Companies;
using B2B.DAL;
using Microsoft.EntityFrameworkCore;

namespace B2B.BLL.Services.Implementation
{
    public class KeyWordService : IKeyWordService
    {
        private readonly IRepository<KeyWord, int> _keyWordsRepository;

        public KeyWordService(IRepository<KeyWord, int> keyWordsRepository)
        {
            _keyWordsRepository = keyWordsRepository;
        }

        public async Task<ICollection<KeyWord>> GetByWordAsync(string word)
            => await _keyWordsRepository
                .Table
                .Where(x => x.Word.Contains(word.ToLower()))
                .ToListAsync();
    }
}
