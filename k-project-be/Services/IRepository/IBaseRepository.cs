using LoginProject.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LoginProject.Services.IRepository
{
    public interface IBaseRepository<TEntity>
        where TEntity : class
    {
        Task<List<TEntity>> GetAll(Expression<Func<TEntity, bool>> filter = null!, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null!, string includeProperties = "", int PageIndex = 0, int PageSize = 0);
        Task<TEntity> GetById(object id);
        Task<TEntity> Insert(TEntity entity);
        Task<string> Delete(object id);
        Task<TEntity> Update(TEntity entityToUpdate);
    }
}
