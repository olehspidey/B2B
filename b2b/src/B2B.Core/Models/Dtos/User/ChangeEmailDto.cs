using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.User
{
    public class ChangeEmailDto
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string NewEmail { get; set; }
    }
}
