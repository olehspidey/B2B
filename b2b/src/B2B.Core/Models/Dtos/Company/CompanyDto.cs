using B2B.Core.Models.Dtos.Person;

namespace B2B.Core.Models.Dtos.Company
{
    public class CompanyDto
    {
        public int Id { get; set; }

        public string ShortName { get; set; }

        public string FullName { get; set; }

        public PersonDto Owner { get; set; }

        public string Description { get; set; }
    }
}
