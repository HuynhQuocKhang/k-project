using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LoginProject.Models
{
    public class Permission : BaseEntity
    {
        [JsonIgnore]
        [NotMapped]
        public IEnumerable<Role>? Roles { get; set; } = new HashSet<Role>();
    }
}
