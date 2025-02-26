using AutoMapper;
using LoginProject.DTOs.Request;
using LoginProject.DTOs.Response;
using LoginProject.Models;

namespace LoginProject.Infrastructure.Mapper
{
    public class UserInfoProfile : Profile
    {
        public UserInfoProfile()
        {
            CreateMap<UserInfo, UserInfo>();
            CreateMap<UserInfo, UserRequest>().ReverseMap();
            CreateMap<UserInfo, UserResponse>().ReverseMap();
        }
    }
}
