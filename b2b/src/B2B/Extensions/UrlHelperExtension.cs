using Microsoft.AspNetCore.Mvc;

namespace B2B.Extensions
{
    public static class UrlHelperExtension
    {
        public static string GetEntityByIdUrl(this IUrlHelper urlHelper, string action, string controller, string id, string scheme)
            => urlHelper.Action(
                action: action,
                controller: controller,
                values: new { id },
                protocol: scheme);
    }
}
