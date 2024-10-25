using System.ComponentModel.DataAnnotations.Schema;

namespace LoginProject.Models
{
    public class Role : BaseEntity
    {
        [NotMapped]
        public IEnumerable<Permission>? Permissions { get; set; } = new HashSet<Permission>();
    }
}
