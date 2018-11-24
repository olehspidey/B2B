using B2B.Core.Models.DomainModels.Persons;

namespace B2B.Core.Models.Dtos.Person
{
    public class PersonDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public PersonType PersonType { get; set; }
    }
}
