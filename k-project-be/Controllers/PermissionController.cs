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
    public class PermissionController : BaseController<Guid, Permission>
    {
        private readonly IPermissionRepository _repository;
        private readonly IMapper _mapper;
        public PermissionController(IPermissionRepository repository,IMapper mapper) : base(
            repository)
        {
            _repository = repository;
            _mapper = mapper;
        }

        //[HttpPost("Create")]
        //public async Task<ResultApi> Create(PermissionRequest req)
        //{
        //    try
        //    {
        //        var request = _mapper.Map<Permission>(req);
        //        var rs = await _repository.Insert(request);
        //        PermissionResponse res = _mapper.Map<Permission, PermissionResponse>(rs);
        //        return new ResultApi
        //        {
        //            Success = true,
        //            Data = res,
        //            Error = ""
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResultApi
        //        {
        //            Success = false,
        //            Data = ex,
        //            Error = ex.Message
        //        };
        //    }
        //}

        //[HttpPost("Delete")]
        //public ResultApi Delete(Guid id)
        //{
        //    try
        //    {
        //        var rs = _repository.Delete(id);
        //        return new ResultApi
        //        {
        //            Success = true,
        //            Data = rs,
        //            Error = ""
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResultApi
        //        {
        //            Success = false,
        //            Data = ex,
        //            Error = ex.Message
        //        };
        //    }
        //}

        //[HttpPost("Update")]
        //public async Task<ResultApi> Update(PermissionRequest req)
        //{
        //    try
        //    {
        //        var request = _mapper.Map<Permission>(req);
        //        var rs = await _repository.Update(request);
        //        PermissionResponse res = _mapper.Map<Permission, PermissionResponse>(rs);
        //        return new ResultApi
        //        {
        //            Success = true,
        //            Data = res,
        //            Error = ""
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResultApi
        //        {
        //            Success = false,
        //            Data = ex,
        //            Error = ex.Message
        //        };
        //    }
        //}

        //[HttpPost("GetAll")]
        //public async Task<ResultApi> GetAll()
        //{
        //    try
        //    {
        //        var rs = await _repository.GetAll();
        //        return new ResultApi
        //        {
        //            Success = true,
        //            Data = rs,
        //            Error = ""
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResultApi
        //        {
        //            Success = false,
        //            Data = ex,
        //            Error = ex.Message
        //        };
        //    }
        //}

        //[HttpPost("GetById")]
        //public async Task<ResultApi> GetById(Guid id)
        //{
        //    try
        //    {
        //        var rs = await _repository.GetById(id);
        //        PermissionResponse res = _mapper.Map<Permission, PermissionResponse>(rs);
        //        return new ResultApi
        //        {
        //            Success = true,
        //            Data = res,
        //            Error = ""
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ResultApi
        //        {
        //            Success = false,
        //            Data = ex,
        //            Error = ex.Message
        //        };
        //    }
        //}
    }
}
