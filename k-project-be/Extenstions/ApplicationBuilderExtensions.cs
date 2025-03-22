using LoginProject.Services.IRepository;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.OpenApi.Models;

namespace LoginProject.Extenstions
{

    public static class ApplicationBuilderExtensions
    {
        public static void CustomApplicationBuilder(this IApplicationBuilder app)
        {
            // Configure the HTTP request pipeline.
            //if (app.ApplicationServices.GetService<IHostEnvironment>().IsDevelopment())
            //{
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "K Site API");
            });
            app.UseDeveloperExceptionPage();
            //}

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseAuthorization();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); // This is correct now
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
