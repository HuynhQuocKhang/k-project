using LoginProject.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;

namespace LoginProject.Services.IRepository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IConfiguration _configuration;

        public RoleRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<string> Delete(object id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Role>> GetAll(Expression<Func<Role, bool>> filter = null, Func<IQueryable<Role>, IOrderedQueryable<Role>> orderBy = null, string includeProperties = "", int PageIndex = 0, int PageSize = 0)
        {
            throw new NotImplementedException();
        }

        public Task<Role> GetById(object id)
        {
            throw new NotImplementedException();
        }

        public Task<Role> Insert(Role entity)
        {
            throw new NotImplementedException();
        }

        public Task<Role> Update(Role entityToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
