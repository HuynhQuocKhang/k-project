using LoginProject.Migrations.ModelConfiguration;
using LoginProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LoginProject.Migrations
{
    public partial class ApplicationDBContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public ApplicationDBContext(IConfiguration configuration) => _configuration = configuration;

        public ApplicationDBContext(IConfiguration configuration, DbContextOptions<ApplicationDBContext> options)
        : base(options) => _configuration = configuration;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseSqlServer(_configuration.GetConnectionString("DefaultConnection"),
                x => x.UseNetTopologySuite());
            }

        }

        public virtual DbSet<UserInfo> UserInfos { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new UserInfoConfiguration().Configure(modelBuilder.Entity<UserInfo>());
        }
    }
}
