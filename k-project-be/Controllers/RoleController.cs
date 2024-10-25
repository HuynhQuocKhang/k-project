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
    public class RoleController : BaseController<Guid, Role>
    {
        private readonly IRoleRepository _repository;
        public RoleController(IRoleRepository repository) : base(
            repository)
        {
            _repository = repository;
        }
    }
}
