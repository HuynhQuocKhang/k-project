using AutoMapper;
using LoginProject.DTOs.Request;
using LoginProject.DTOs.Response;
using LoginProject.Migrations;
using LoginProject.Models;

namespace LoginProject.Infrastructure.Mapper
{
    public class PermissionProfile : Profile
    {
        public PermissionProfile()
        {
            CreateMap<Permission, PermissionRequest>().ReverseMap();
            CreateMap<Permission, PermissionResponse>().ReverseMap();
        }
    }
}
