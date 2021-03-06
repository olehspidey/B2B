﻿using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Subscriptions;

namespace B2B.Core.Models.Dtos.User
{
    public class ApplicationFormDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public SubscriptionType? SubscriptionType { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public ApplicationFormStatus Status { get; set; }
    }
}
