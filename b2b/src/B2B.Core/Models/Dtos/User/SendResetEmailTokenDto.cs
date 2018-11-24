using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.User
{
    public class SendResetEmailTokenDto
    {
        [Required]
        [EmailAddress]
        public string NewEmail { get; set; }
    }
}
