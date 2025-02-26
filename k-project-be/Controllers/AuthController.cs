using AutoMapper;
using LoginProject.DTOs;
using LoginProject.DTOs.Request;
using LoginProject.DTOs.Response;
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
        private readonly IMapper _mapper;
        public AuthController(ILoginRepository repository,IMapper mapper) : base(
            repository)
        {
            _repository = repository;
        }

        [HttpPost("CreateUser")]
        public async Task<ResultApi> Create(UserRequest req)
        {
            try
            {
                var request = _mapper.Map<UserInfo>(req);
                var rs = await _repository.Insert(request);
                UserResponse res = _mapper.Map<UserInfo,UserResponse>(rs);
                return new ResultApi
                {
                    Success = true,
                    Data = res,
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

        [HttpGet("DeleteUser")]
        public ResultApi Delete(Guid id)
        {
            try
            {
                var rs = _repository.Delete(id);
                return new ResultApi
                {
                    Success = true,
                    Data = rs,
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

        [HttpPost("UpdateUser")]
        public async Task<ResultApi> Update(UserRequest req)
        {
            try
            {
                var request = _mapper.Map<UserInfo>(req);
                var rs = await _repository.Update(request);
                UserResponse res = _mapper.Map<UserInfo, UserResponse>(rs);
                return new ResultApi
                {
                    Success = true,
                    Data = res,
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

        [HttpGet("GetAllUser")]
        public async Task<ResultApi> GetAll()
        {
            try
            {
                var rs = await _repository.GetAll();
                return new ResultApi
                {
                    Success = true,
                    Data = rs,
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

        [HttpGet("GetByIdUser")]
        public async Task<ResultApi> GetById(Guid id)
        {
            try
            {
                var rs = await _repository.GetById(id);
                UserResponse res = _mapper.Map<UserInfo, UserResponse>(rs);
                return new ResultApi
                {
                    Success = true,
                    Data = res,
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
