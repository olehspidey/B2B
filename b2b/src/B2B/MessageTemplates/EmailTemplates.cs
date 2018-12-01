using B2B.Core.Models.DomainModels;

namespace B2B.MessageTemplates
{
    public static class EmailTemplates
    {
        public static string GetCreateUserFromForm(User user, string redirectUrl, string serviceUrl)
            => $@"
            {InDivTag($"Your application form for registration in our B2B service {serviceUrl} has been approved.")}
            {InDivTag("Below are your personal data:")}    
            {InDivTag($"Name: {user.Name}")}
            {InDivTag($"Last name: {user.LastName}")}
            {InDivTag($"Email: {user.Email}")}
            {InDivTag($"Phone: {user.PhoneNumber}")}
            {InDivTag($"Subscription type: {user.Subscription.SubscriptionType.ToString()}")}

            {InDivTag("If the data does not match, you can change it in your personal cabinet.")}
            {InATag("Click to go to your personal cabinet", redirectUrl)}
            ";

        private static string InDivTag(string s)
            => $"<div>{s}</div>";

        private static string InATag(string s, string href)
            => $"<a href=\"{href}\">{s}</a>";
    }
}
