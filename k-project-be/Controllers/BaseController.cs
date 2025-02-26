using LoginProject.DTOs;
using LoginProject.Models;
using LoginProject.Services.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace LoginProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TKey, TEntity> : ControllerBase
       where TEntity : class
    {
        internal IBaseRepository<TEntity> _service;
        public BaseController(IBaseRepository<TEntity> service)
        {
            this._service = service;
        }
        //[ApiExplorerSettings(IgnoreApi = true)]
        [Route("[action]")]
        [HttpGet]
        public virtual async Task<ResultApi> GetAll()
        {
            try
            {
                var result = await _service.GetAll();
                return new ResultApi(result);
            }
            catch (Exception ex)
            {
                return new ResultApi(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpGet]
        public virtual async Task<ResultApi> GetById(TKey id)
        {
            try
            {
                object data = new();
                if (id != null)
                    data = await _service.GetById(id);
                return new ResultApi(data);
            }
            catch (Exception ex)
            {
                return new ResultApi(ex.Message);
            }
        }


        [Route("[action]")]
        [HttpPost]
        public virtual async Task<ResultApi> Create(TEntity entity)
        {
            try
            {
                var rs = await _service.Insert(entity);
                return new ResultApi(rs);
            }
            catch (Exception ex)
            {
                return new ResultApi(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public virtual async Task<ResultApi> Update(TEntity entity)
        {
            try
            {
                var rs = await _service.Update(entity);
                return new ResultApi(rs);
            }
            catch (Exception ex)
            {
                return new ResultApi(ex.Message);
            }
        }
        [Route("[action]")]
        [HttpGet]
        public virtual async Task<ResultApi> Delete(TKey id)
        {
            try
            {
                if (id != null)
                    return new ResultApi(_service.Delete(id));
                else
                    return new ResultApi("ID is null");
            }
            catch (Exception ex)
            {
                return new ResultApi(ex.Message);
            }
        }
    }
}