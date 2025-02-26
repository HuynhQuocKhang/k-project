using AutoMapper;
using LoginProject.DTOs.Request;
using LoginProject.DTOs.Response;
using LoginProject.Migrations;
using LoginProject.Models;

namespace LoginProject.Infrastructure.Mapper
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<Role, RoleRequest>().ReverseMap();
            CreateMap<Role, RoleResponse>().ReverseMap();
        }
    }
}
