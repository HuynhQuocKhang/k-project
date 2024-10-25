using LoginProject.DTOs;
using LoginProject.Models;
using LoginProject.Services.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LoginProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : BaseController<Guid, Permission>
    {
        private readonly IPermissionRepository _repository;
        public PermissionController(IPermissionRepository repository) : base(
            repository)
        {
            _repository = repository;
        }
    }
}
