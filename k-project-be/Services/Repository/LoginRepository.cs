using LoginProject.DTOs;
using LoginProject.Models;
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

        public LoginRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<string> Delete(object id)
        {
            throw new NotImplementedException();
        }

        public Task<List<UserInfo>> GetAll(Expression<Func<UserInfo, bool>> filter = null, Func<IQueryable<UserInfo>, IOrderedQueryable<UserInfo>> orderBy = null, string includeProperties = "", int PageIndex = 0, int PageSize = 0)
        {
            throw new NotImplementedException();
        }

        public Task<UserInfo> GetById(object id)
        {
            throw new NotImplementedException();
        }

        public Task<UserInfo> Insert(UserInfo entity)
        {
            throw new NotImplementedException();
        }

        public Task<UserInfo> Update(UserInfo entityToUpdate)
        {
            throw new NotImplementedException();
        }

        public async Task<string> Login (LoginRequest userInfo)
        {
            // Giả sử bạn đã tạo một phương thức xác thực người dùng
            var isValidUser = await IsValidUser(userInfo);
            if (isValidUser)
            {
                // Nếu thông tin đăng nhập hợp lệ, tạo JWT token
                var token =  GenerateJwtToken(userInfo);
                return token;
            }
            else
            {
                return "";
            }
        }

       

        private string GenerateJwtToken(LoginRequest user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"] ?? "HcPGtz6nvzxEKmITWuHVKfpTZL1+Tii18z+E+FhxfFg="));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpiresInMinutes"])),
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
