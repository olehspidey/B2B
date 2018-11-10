using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace B2B.Core.Models.DomainModels.Companies
{
    public class Address : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        public string Country { get; set; }

        [Required]
        [MinLength(2)]
        public string CountryId { get; set; }

        [Required]
        [MinLength(2)]
        public string City { get; set; }

        [Required]
        [MinLength(2)]
        public string CityId { get; set; }
    }
}
