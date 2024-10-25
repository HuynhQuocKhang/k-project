using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using LoginProject.Models;

namespace LoginProject.Migrations.ModelConfiguration
{
    public class UserInfoConfiguration : IEntityTypeConfiguration<UserInfo>
    {

        public void Configure(EntityTypeBuilder<UserInfo> builder)
        {
            builder.ToTable("UserInfo");
            builder.HasKey(h => h.Id);

            builder.HasOne(x => x.Role)
            .WithMany()
            .HasForeignKey(x => x.RoleId)
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
