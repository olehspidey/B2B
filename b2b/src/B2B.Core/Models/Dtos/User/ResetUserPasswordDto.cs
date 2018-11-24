using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.User
{
    public class ResetUserPasswordDto
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}
