using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LoginProject.Models
{
    public class UserInfo : BaseEntity
    {
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public Guid RoleId { get; set; }

        [JsonIgnore]
        [NotMapped]
        public Role Role { get; set; }
    }
}
