using System.ComponentModel.DataAnnotations;
using B2B.Core.Models.DomainModels;
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

        public Address Address { get; set; }

        public string Description { get; set; }
    }
}
