using System.Collections.Generic;
using B2B.Core.Models.DomainModels.Companies;
using B2B.Core.Models.Dtos.Person;

namespace B2B.Core.Models.Dtos.Company
{
    public class CompanyDto
    {
        public int Id { get; set; }

        public string ShortName { get; set; }

        public string FullName { get; set; }

        public PersonDto Owner { get; set; }

        public AddressDto Address { get; set; }

        public string Description { get; set; }

        public CompanyCategory Category { get; set; }

        public bool CanEdit { get; set; } = false;

        public bool CanMoveToSuggests { get; set; } = false;

        public bool Suggestion { get; set; }

        public virtual List<KeyWordDto> KeyWords { get; set; }
    }
}
