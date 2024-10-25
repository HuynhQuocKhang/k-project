using System.ComponentModel.DataAnnotations.Schema;

namespace LoginProject.Models
{
    public class Permission : BaseEntity
    {
        [NotMapped]
        public IEnumerable<Role>? Roles { get; set; } = new HashSet<Role>();
    }
}
