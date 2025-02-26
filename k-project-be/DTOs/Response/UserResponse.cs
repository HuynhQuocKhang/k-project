using LoginProject.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoginProject.DTOs.Response
{
    public class UserResponse
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = "";
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public Guid RoleId { get; set; }
    }
}
