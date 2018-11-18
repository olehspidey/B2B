using System.ComponentModel.DataAnnotations;
using B2B.Core.Models.DomainModels.Subscriptions;

namespace B2B.Core.Models.Dtos.User
{
    public class CreateApplicationFormDto
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        [MinLength(2)]
        public string LastName { get; set; }

        [Required]
        public SubscriptionType? SubscriptionType { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}
