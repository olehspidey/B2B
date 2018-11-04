using System;
using System.ComponentModel.DataAnnotations;
using B2B.Core.Models.DomainModels.Subscriptions;

namespace B2B.Core.Models.Dtos.User
{
    public class SubscriptionDto
    {
        public DateTime? End { get; set; }

        [Required]
        public SubscriptionType? SubscriptionType { get; set; }
    }
}
