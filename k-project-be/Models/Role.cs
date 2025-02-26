using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LoginProject.Models
{
    public class Role : BaseEntity
    {
        [JsonIgnore]
        [NotMapped]
        public IEnumerable<Permission>? Permissions { get; set; } = new HashSet<Permission>();
    }
}
