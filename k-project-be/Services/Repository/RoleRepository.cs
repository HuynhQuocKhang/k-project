using AutoMapper;
using LoginProject.DTOs.Request;
using LoginProject.Migrations;
using LoginProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;

namespace LoginProject.Services.IRepository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ApplicationDBContext _dbContext;

        public RoleRepository(IConfiguration configuration, ApplicationDBContext dbContext, IMapper mapper)
        {
            _configuration = configuration;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public string Delete(object id)
        {
            try
            {
                if (id.GetType() != typeof(Guid))
                    return "ID is unvalid";

                var entity = _dbContext.Roles.Where(x => x.Id == (Guid)id).AsNoTracking().FirstOrDefault();
                if (entity == null)
                    return "Entity is not existing in database";
                else
                {
                    _dbContext.Roles.Remove(entity);
                    _dbContext.SaveChanges();
                    return "Deleted";
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Role>> GetAll(Expression<Func<Role, bool>>? filter = null, Func<IQueryable<Role>, IOrderedQueryable<Role>>? orderBy = null, string includeProperties = "", int PageIndex = 0, int PageSize = 0)
        {
            try
            {
                if (filter != null)
                {
                    var rs = await _dbContext.Roles.Where(filter).ToListAsync();
                    return rs ?? new List<Role>();
                }
                else
                {
                    var rs = await _dbContext.Roles.ToListAsync();
                    return rs;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Role> GetById(object id)
        {
            try
            {
                if (id.GetType() != typeof(Guid))
                    throw new Exception("ID is unvalid");

                var entity = await _dbContext.Roles.Where(x => x.Id == (Guid)id).Include(x => x.Permissions).AsNoTracking().FirstOrDefaultAsync();
                if (entity == null)
                    throw new Exception("Entity is not existing in database");
                else
                {
                    return entity;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Role> Insert(Role entity)
        {
            try
            {
                entity.Id = Guid.NewGuid();
                var rs = await _dbContext.Roles.AddAsync(entity);
                _dbContext.SaveChanges();
                return rs.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Role> Update(Role entityToUpdate)
        {
            try
            {
                var entity = await _dbContext.Roles.Where(x => x.Id == entityToUpdate.Id).AsNoTracking().FirstOrDefaultAsync();
                if (entity == null)
                {
                    var rs = await _dbContext.Roles.AddAsync(entityToUpdate);
                    _dbContext.SaveChanges();
                    return rs.Entity as Role;
                }
                else
                {
                    entity = _mapper.Map<Role>(entityToUpdate);
                    _dbContext.SaveChanges();
                    return entity;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
