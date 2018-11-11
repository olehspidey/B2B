using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.DomainModels.Companies
{
    public class CreateSuggestionDto
    {
        [Range(0, int.MaxValue)]
        public int CompanyId { get; set; }
    }
}
