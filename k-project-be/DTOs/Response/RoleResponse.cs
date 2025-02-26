using LoginProject.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoginProject.DTOs.Response
{
    public class RoleResponse: BaseEntity
    {
        public Guid? PermissionID{ get; set; }
        public Permission? Permissions { get; set; }
    }
}
