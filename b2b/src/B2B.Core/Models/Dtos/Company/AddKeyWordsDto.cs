using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace B2B.Core.Models.Dtos.Company
{
    public class AddKeyWordsDto
    {
        [Range(0, int.MaxValue)]
        public int Id { get; set; }

        public List<string> Words { get; set; }
    }
}
