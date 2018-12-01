using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using B2B.Core.Models.DomainModels.Subscriptions;

namespace B2B.Core.Models.DomainModels
{
    public class ApplicationForm : IEntity<int>
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

        [Range((int)SubscriptionType.Lite, (int)SubscriptionType.Free)]
        public SubscriptionType SubscriptionType { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Range((int)ApplicationFormStatus.New, (int)ApplicationFormStatus.Rejected)]
        public ApplicationFormStatus Status { get; set; }
    }
}
