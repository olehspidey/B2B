using System.ComponentModel.DataAnnotations;
using B2B.Core.Models.DomainModels.Persons;

namespace B2B.Core.Models.Dtos.Person
{
    public class CreatePersonDto
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        [MinLength(2)]
        public string LastName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public PersonType PersonType { get; set; }
    }
}
