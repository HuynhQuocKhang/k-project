using System.ComponentModel.DataAnnotations.Schema;

namespace LoginProject.Models
{
    public class UserInfo : BaseEntity
    {
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public Guid RoleId { get; set; }
        [NotMapped]
        public Role Role { get; set; }
    }
}
