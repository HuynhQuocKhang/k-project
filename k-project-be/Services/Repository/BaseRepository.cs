using LoginProject.Migrations;
using LoginProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;

namespace LoginProject.Services.IRepository
{
    public class BaseRepository<TEntity, TContext> : IBaseRepository<TEntity>
    where TEntity : class
    where TContext : ApplicationDBContext
    {
        private readonly ILogger<BaseRepository<TEntity, TContext>> _logger;
        private readonly TContext _context;

        public BaseRepository(ILogger<BaseRepository<TEntity, TContext>> logger, TContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<List<TEntity>> GetAll(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "",
            int pageIndex = 0,
            int pageSize = 0)
        {
            try
            {
                IQueryable<TEntity> query = _context.Set<TEntity>();

                if (filter != null)
                {
                    query = query.Where(filter);
                }

                foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }

                if (orderBy != null)
                {
                    query = orderBy(query);
                }

                return query.Skip(pageIndex * pageSize).Take(pageSize).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(GetAll)} function error on {nameof(BaseRepository<TEntity, TContext>)}");
                throw;
            }
        }

        public async Task<TEntity> GetById(object id)
        {
            try
            {
                return _context.Set<TEntity>().Find(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(GetById)} function error on {nameof(BaseRepository<TEntity, TContext>)}");
                throw;
            }
        }

        public async Task<TEntity> Insert(TEntity entity)
        {
            try
            {
                _context.Set<TEntity>().Add(entity);
                _context.SaveChanges();
                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(Insert)} function error on {nameof(BaseRepository<TEntity, TContext>)}");
                throw;
            }
        }

        public async Task<string> Delete(object id)
        {
            try
            {
                var entityToDelete = await GetById(id);
                if (entityToDelete != null)
                {
                    _context.Set<TEntity>().Remove(entityToDelete);
                    _context.SaveChanges();
                    return id.ToString();
                }
                return "";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(Delete)} function error on {nameof(BaseRepository<TEntity, TContext>)}");
                throw;
            }
        }

        public async Task<TEntity> Update(TEntity entityToUpdate)
        {
            try
            {
                _context.Set<TEntity>().Update(entityToUpdate);
                _context.SaveChanges();
                return entityToUpdate;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"{nameof(Update)} function error on {nameof(BaseRepository<TEntity, TContext>)}");
                throw;
            }
        }
    }
}
