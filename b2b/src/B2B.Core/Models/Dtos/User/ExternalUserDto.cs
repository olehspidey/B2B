using System.Collections.Generic;

namespace B2B.Core.Models.Dtos.User
{
    public class ExternalUserDto : UserDto
    {
        //
        // Summary:
        //     Gets or sets a flag indicating if a user has confirmed their email address.
        public bool EmailConfirmed { get; set; }

        //
        // Summary:
        //     Gets or sets the email address for this user.
        public virtual string Email { get; set; }

        //
        // Summary:
        //     Gets or sets a flag indicating if a user has confirmed their telephone address.
        public bool PhoneNumberConfirmed { get; set; }
        //
        // Summary:
        //     Gets or sets a telephone number for the user.
        public string PhoneNumber { get; set; }

        public SubscriptionDto Subscription { get; set; }

        public double Bill { get; set; }

        public ICollection<string> UserRoles { get; set; }
    }
}
