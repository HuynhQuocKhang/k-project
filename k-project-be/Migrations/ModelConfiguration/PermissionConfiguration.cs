using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using LoginProject.Models;

namespace LoginProject.Migrations.ModelConfiguration
{
    public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
    {

        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.ToTable("Permissions");
            builder.HasKey(h => h.Id);
        }
    }
}
