using LoginProject.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoginProject.DTOs.Request
{
    public class UserRequest: BaseEntity
    {
        public string UserName { get; set; } = "";
        public string Password { get; set; } = "";
        public Guid? RoleId { get; set; }
    }
}
