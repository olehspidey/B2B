using B2B.Core.Models.DomainModels.Subscriptions;

namespace B2B.Core.Models.Dtos.User
{
    public class RegistrationUserFormDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public SubscriptionType? SubscriptionType { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}
