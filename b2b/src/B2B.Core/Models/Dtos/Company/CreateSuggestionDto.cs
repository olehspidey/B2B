using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.Company
{
    public class CreateSuggestionDto
    {
        [Range(0, int.MaxValue)]
        public int CompanyId { get; set; }
    }
}
