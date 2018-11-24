using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.ApplicationForm
{
    public class RejectApplicationFormDto
    {
        [Range(0, int.MaxValue)]
        public int Id { get; set; }
    }
}
