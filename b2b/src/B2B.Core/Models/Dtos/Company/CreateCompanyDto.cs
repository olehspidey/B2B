using System.ComponentModel.DataAnnotations;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Companies;
using B2B.Core.Models.Dtos.Person;

namespace B2B.Core.Models.Dtos.Company
{
    public class CreateCompanyDto
    {
        [Required]
        [MinLength(2)]
        public string ShortName { get; set; }

        [Required]
        [MinLength(2)]
        public string FullName { get; set; }

        [Required]
        public CreatePersonDto Owner { get; set; }

        public CreateAddresDto Address { get; set; }

        [Range((int)CompanyCategory.IndustrialChemistry, (int)CompanyCategory.ConstructionAndRepair)]
        public CompanyCategory Category { get; set; }

        public string Description { get; set; }
    }
}
