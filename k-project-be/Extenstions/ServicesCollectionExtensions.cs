using AutoMapper;
using LoginProject.Infrastructure.Mapper;
using LoginProject.Migrations;
using LoginProject.Services.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.OpenApi.Models;

namespace LoginProject.Extenstions
{
    public static class ServicesCollectionExtensions
    {
        public static void CustomServices(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()      // Allow any header
                           .AllowAnyMethod());// Allow any method (GET, POST, etc.)
            });

            // Add controllers
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = null; // Remove Preserve
                    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull; // Optional: Ignore nulls
                });
            // Swagger configuration
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "K Site API", Version = "v1" });
            });


            
            // JWT settings
            services.Configure<JsonWebToken>(configuration.GetSection("JwtSettings"));
            services.AddDbContext<ApplicationDBContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            // Dependency injection
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IPermissionRepository, PermissionRepository>();
            services.AddScoped<ILoginRepository, LoginRepository>();


            var config = new MapperConfiguration(cfg =>
            {
                cfg.AllowNullCollections = true;
                cfg.AddProfile<UserInfoProfile>();
                cfg.AddProfile<RoleProfile>();
                cfg.AddProfile<PermissionProfile>();
            });

            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);

        }
    }
}
