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
            services.AddControllers();

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
            services.AddSingleton<IConfiguration>(configuration);
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IPermissionRepository, PermissionRepository>();
            services.AddScoped<ILoginRepository, LoginRepository>();
        }
    }
}
