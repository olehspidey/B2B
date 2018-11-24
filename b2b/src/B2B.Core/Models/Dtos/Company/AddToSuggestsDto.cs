using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.Company
{
    public class AddToSuggestsDto
    {
        [Range(0, int.MaxValue)]
        public int Id { get; set; }
    }
}
