using AutoMapper;
using LoginProject.DTOs;
using LoginProject.DTOs.Request;
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
    public class LoginRepository : ILoginRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDBContext _dbContext;
        private readonly IMapper _mapper;

        public LoginRepository(IConfiguration configuration, ApplicationDBContext dbContext, IMapper mapper)
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

                var entity = _dbContext.UserInfos.Where(x => x.Id == (Guid)id).AsNoTracking().FirstOrDefault();
                if (entity == null)
                    return "Entity is not existing in database";
                else
                {
                    _dbContext.UserInfos.Remove(entity);
                    _dbContext.SaveChanges();
                    return "Deleted";
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<UserInfo>> GetAll(Expression<Func<UserInfo, bool>>? filter = null, Func<IQueryable<UserInfo>, IOrderedQueryable<UserInfo>>? orderBy = null, string includeProperties = "", int PageIndex = 0, int PageSize = 0)
        {
            try
            {
                if (filter != null)
                {
                    var rs = await _dbContext.UserInfos.Where(filter).ToListAsync();
                    return rs ?? new List<UserInfo>();
                }
                else
                {
                    var rs = await _dbContext.UserInfos.ToListAsync() ?? new List<UserInfo>();
                    return rs;
                }    
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<UserInfo> GetById(object id)
        {
            try
            {
                if (id.GetType() != typeof(Guid))
                    throw new Exception("ID is unvalid");

                var entity = await _dbContext.UserInfos.Where(x => x.Id == (Guid)id).AsNoTracking().FirstOrDefaultAsync();
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

        public async Task<UserInfo> Insert(UserInfo entity)
        {
            try
            {
                entity.Id = Guid.NewGuid();
                var rs = await _dbContext.UserInfos.AddAsync(entity);
                _dbContext.SaveChanges();
                return rs.Entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<UserInfo> Update(UserInfo entityToUpdate)
        {
            try
            {
                var entity = await _dbContext.UserInfos.Where(x => x.Id == entityToUpdate.Id).AsNoTracking().FirstOrDefaultAsync();
                if (entity == null)
                {
                    var rs = await _dbContext.UserInfos.AddAsync(entityToUpdate);
                    _dbContext.SaveChanges();
                    return rs.Entity as UserInfo;
                }
                else
                {
                    entity = _mapper.Map<UserInfo>(entityToUpdate);
                    _dbContext.SaveChanges();
                    return entity;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> Login(LoginRequest userInfo)
        {
            // Giả sử bạn đã tạo một phương thức xác thực người dùng
            var isValidUser = await IsValidUser(userInfo);
            if (isValidUser)
            {
                var roles = new List<string> { "Admin", "IT" };
                var permissions = new List<string> { "ALL", "IT_ALL" };

                var token = GenerateJwtToken(userInfo, roles, permissions);
                // Nếu thông tin đăng nhập hợp lệ, tạo JWT token
                return token;
            }
            else
            {
                return "";
            }
        }



        private string GenerateJwtToken(LoginRequest user, List<string> roles, List<string> permissions)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"] ?? "HcPGtz6nvzxEKmITWuHVKfpTZL1+Tii18z+E+FhxfFg="));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Define claims with multiple roles and permissions
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            // Add each role as a separate claim
            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            // Add each permission as a separate claim
            foreach (var permission in permissions)
            {
                claims.Add(new Claim("permissions", permission));
            }

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(Convert.ToDouble(_configuration["JwtSettings:ExpiresInDays"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        private async Task<bool> IsValidUser(LoginRequest loginModel)
        {
            return loginModel.UserName == "admin" && loginModel.Password == "password";
        }


    }
}
