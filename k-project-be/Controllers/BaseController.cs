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
        public virtual IActionResult GetAll()
        {
            try
            {
                var result = new { Data = _service.GetAll() };
                return Ok(new ResultApi(result));
            }
            catch (Exception ex)
            {
                return BadRequest(new ResultApi(ex));
            }
        }

        [Route("[action]")]
        [HttpGet]
        public virtual IActionResult GetById(TKey id)
        {
            try
            {
                object data = new();
                if (id != null)
                    data = _service.GetById(id);
                var result = new { Data = data };
                return Ok(new ResultApi(result));
            }
            catch (Exception ex)
            {
                return BadRequest(new ResultApi(ex));
            }
        }


        [Route("[action]")]
        [HttpPost]
        public virtual IActionResult Create(TEntity entity)
        {
            try
            {
                _service.Insert(entity);
                return Ok(new ResultApi(entity));
            }
            catch (Exception ex)
            {
                return BadRequest(new ResultApi(ex));
            }
        }

        [Route("[action]")]
        [HttpPost]
        public virtual IActionResult Update(TEntity entity)
        {
            try
            {
                _service.Update(entity);
                return Ok(new ResultApi(entity));
            }
            catch (Exception ex)
            {
                return BadRequest(new ResultApi(ex));
            }
        }
        [Route("[action]")]
        [HttpGet]
        public virtual IActionResult Delete(TKey? id)
        {
            try
            {
                if (id != null)
                    _service.Delete(id);
                return Ok(new ResultApi(id));
            }
            catch (Exception ex)
            {
                return BadRequest(new ResultApi(ex));
            }
        }
    }
}