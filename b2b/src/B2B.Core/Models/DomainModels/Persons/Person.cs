using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using B2B.Core.Models.DomainModels.Companies;

namespace B2B.Core.Models.DomainModels.Persons
{
    public class Person : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        [MinLength(2)]
        public string LastName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Range((int)PersonType.Physical, (int)PersonType.Legal)]
        public PersonType PersonType { get; set; }

        public virtual Company Company { get; set; }

        [ForeignKey(nameof(Company))]
        public int CompanyId { get; set; }
    }
}
