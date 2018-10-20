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

        public DateTime? End { get; set; }

        public SubscriptionType SubscriptionType { get; set; }

        public virtual User User { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
    }
}
