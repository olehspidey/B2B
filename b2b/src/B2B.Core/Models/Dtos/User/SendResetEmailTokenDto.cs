using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.User
{
    public class SendResetEmailTokenDto
    {
        [Required]
        public string NewEmail { get; set; }
    }
}
