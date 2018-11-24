using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace B2B.Core.Models.DomainModels.Companies
{
    public class KeyWord : IEntity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Word { get; set; }

        public virtual Company Company { get; set; }

        public int CompanyId { get; set; }
    }
}
