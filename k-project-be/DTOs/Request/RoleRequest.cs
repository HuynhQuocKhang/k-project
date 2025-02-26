using LoginProject.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoginProject.DTOs.Request
{
    public class RoleRequest: BaseEntity
    {
        public Guid? PermistionID{ get; set; }
    }
}
