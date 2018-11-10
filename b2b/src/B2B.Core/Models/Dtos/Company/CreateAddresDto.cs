using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.Company
{
    public class CreateAddresDto
    {
        [Required]
        [MinLength(2)]
        public string Country { get; set; }

        [Required]
        [MinLength(2)]
        public string CountryId { get; set; }

        //[Required]
        //[MinLength(2)]
        public string City { get; set; }

        //[Required]
        //[MinLength(2)]
        public string CityId { get; set; }
    }
}
