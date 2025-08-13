using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Middleware;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("Default", p => p
        .AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins(
            builder.Configuration["Cors:Frontend"] ?? "http://localhost:4200")
        .AllowCredentials());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("Default");

app.MapControllers();

// Apply migrations automatically in dev
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (app.Environment.IsDevelopment())
        ctx.Database.Migrate();
}

app.Run();