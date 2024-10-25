using LoginProject.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;

namespace LoginProject.Services.IRepository
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly IConfiguration _configuration;

        public PermissionRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<string> Delete(object id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Permission>> GetAll(Expression<Func<Permission, bool>> filter = null, Func<IQueryable<Permission>, IOrderedQueryable<Permission>> orderBy = null, string includeProperties = "", int PageIndex = 0, int PageSize = 0)
        {
            throw new NotImplementedException();
        }

        public Task<Permission> GetById(object id)
        {
            throw new NotImplementedException();
        }

        public Task<Permission> Insert(Permission entity)
        {
            throw new NotImplementedException();
        }

        public Task<Permission> Update(Permission entityToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
