using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using B2B.Core.Models.DomainModels.Persons;

namespace B2B.Core.Models.DomainModels.Companies
{
    public class Company : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        public string ShortName { get; set; }

        [Required]
        [MinLength(2)]
        public string FullName { get; set; }

        public virtual Person Owner { get; set; }

        public virtual User User { get; set; }

        [Required]
        public virtual Address Address { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        public string Description { get; set; }

        [Range((int)CompanyCategory.IndustrialChemistry, (int)CompanyCategory.ConstructionAndRepair)]
        public CompanyCategory Category { get; set; }

        public bool Suggestion { get; set; }
    }
}
