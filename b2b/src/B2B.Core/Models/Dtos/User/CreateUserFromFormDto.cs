using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.User
{
    public class CreateUserFromFormDto
    {
        [Range(0, int.MaxValue)]
        public int FormId { get; set; }

        [Required]
        public string RedirectUrl { get; set; }

        [Required]
        public string ServiceUrl { get; set; }
    }
}
