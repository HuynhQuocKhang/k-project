using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using LoginProject.Models;

namespace LoginProject.Migrations.ModelConfiguration
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {

        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Roles");
            builder.HasKey(h => h.Id);
        }
    }
}
