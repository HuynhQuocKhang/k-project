using LoginProject.DTOs;
using LoginProject.DTOs.Request;
using LoginProject.Models;

namespace LoginProject.Services.IRepository
{
    public interface ILoginRepository:IBaseRepository<UserInfo>
    {
        public Task<string> Login (LoginRequest userInfo);
    }
}
