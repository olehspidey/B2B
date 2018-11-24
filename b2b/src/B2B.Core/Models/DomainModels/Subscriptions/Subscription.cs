using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace B2B.Core.Models.DomainModels.Subscriptions
{
    public class Subscription : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public DateTime? End { get; set; }

        [Range((int)SubscriptionType.Lite, (int)SubscriptionType.Gold)]
        public SubscriptionType SubscriptionType { get; set; }

        public virtual User User { get; set; }

        public string UserId { get; set; }
    }
}
