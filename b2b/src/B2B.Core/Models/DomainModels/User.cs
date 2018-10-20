using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using B2B.Core.Models.DomainModels.Subscriptions;
using Microsoft.AspNetCore.Identity;

namespace B2B.Core.Models.DomainModels
{
    public class User : IdentityUser, IEntity<string>
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; }

        [Required]
        [MinLength(2)]
        public string LastName { get; set; }

        public double Bill { get; set; }

        public virtual Subscription Subscription { get; set; }

        [ForeignKey(nameof(Subscription))]
        public int SubscriptionId { get; set; }

        public virtual List<Company> Companies { get; set; }
    }
}
