using AutoMapper;
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
    public class PermissionRepository : IPermissionRepository
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ApplicationDBContext _dbContext;

        public PermissionRepository(IConfiguration configuration, ApplicationDBContext dbContext, IMapper mapper)
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

                var entity = _dbContext.Permissions.Where(x => x.Id == (Guid)id).AsNoTracking().FirstOrDefault();
                if (entity == null)
                    return "Entity is not existing in database";
                else
                {
                    _dbContext.Permissions.Remove(entity);
                    _dbContext.SaveChanges();
                    return "Deleted";
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Permission>> GetAll(Expression<Func<Permission, bool>>? filter = null, Func<IQueryable<Permission>, IOrderedQueryable<Permission>>? orderBy = null, string includeProperties = "", int PageIndex = 0, int PageSize = 0)
        {

            try
            {
                if (filter != null)
                {
                    var rs = await _dbContext.Permissions.Where(filter).ToListAsync();
                    return rs ?? new List<Permission>();
                }
                else
                {
                    var rs = await _dbContext.Permissions.ToListAsync();
                    return rs;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Permission> GetById(object id)
        {
            try
            {
                if (id.GetType() != typeof(Guid))
                    throw new Exception("ID is unvalid");

                var entity = await _dbContext.Permissions.Where(x => x.Id == (Guid)id).Include(x => x.Roles).AsNoTracking().FirstOrDefaultAsync();
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

        public async Task<Permission> Insert(Permission entity)
        {
            try
            {
                if (_dbContext == null)
                    throw new InvalidOperationException("Database context is not initialized.");
                entity.Id = Guid.NewGuid();
                var rs = await _dbContext.Permissions.AddAsync(entity);
                _dbContext.SaveChanges();
                return rs.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Permission> Update(Permission entityToUpdate)
        {
            try
            {
                var entity = await _dbContext.Permissions.Where(x => x.Id == entityToUpdate.Id).AsNoTracking().FirstOrDefaultAsync();
                if (entity == null)
                {
                    var rs = await _dbContext.Permissions.AddAsync(entityToUpdate);
                    _dbContext.SaveChanges();
                    return rs.Entity as Permission;
                }
                else
                {
                    entity = _mapper.Map<Permission>(entityToUpdate);
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
