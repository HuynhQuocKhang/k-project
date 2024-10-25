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
    public class AuthController : BaseController<Guid, UserInfo>
    {
        private readonly ILoginRepository _repository;
        public AuthController(ILoginRepository repository) : base(
            repository)
        {
            _repository = repository;
        }


        [HttpPost("Login")]
        public async Task<ResultApi> Login(LoginRequest loginModel)
        {
            try
            {
                var emp = await _repository.Login(loginModel);
                return new ResultApi
                {
                    Success = true,
                    Data = emp,
                    Error = ""
                };
            }
            catch (Exception ex)
            {
                return new ResultApi
                {
                    Success = false,
                    Data = ex,
                    Error = ex.Message
                };
            }
        }
    }
}
