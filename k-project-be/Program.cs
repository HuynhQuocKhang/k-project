using LoginProject.Extenstions;
using LoginProject.Services.IRepository;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.OpenApi.Models;



var builder = WebApplication.CreateBuilder(args);
builder.Services.CustomServices(builder.Configuration);
var app = builder.Build();

app.CustomApplicationBuilder();
app.Run();
