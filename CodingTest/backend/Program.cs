using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using TaskApi.Data; // <-- your DbContext namespace

var builder = WebApplication.CreateBuilder(args);

// --- Force Kestrel to listen on ALL interfaces (container-safe) ---
builder.WebHost.ConfigureKestrel(options =>
{
    // This overrides URLS/HTTP_PORTS/ASPNETCORE_URLS and binds to 0.0.0.0:5000
    options.ListenAnyIP(5000);
});

// ---- EF Core + SQL Server ----
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    opt.EnableDetailedErrors();
    if (builder.Environment.IsDevelopment())
        opt.EnableSensitiveDataLogging();
});

// ---- MVC/JSON ----
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

// ---- CORS (dev-wide allow to avoid surprises) ----
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("Default", p => p
        .AllowAnyHeader()
        .AllowAnyMethod()
        .SetIsOriginAllowed(_ => true));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

// CORS
app.UseCors("Default");

// No HTTPS redirection in containers
// app.UseHttpsRedirection();

app.MapControllers();

// ---- quick smoke tests ----
app.MapGet("/ping", () => Results.Text("pong", "text/plain"));

app.MapGet("/health/db", async (AppDbContext ctx) =>
{
    try
    {
        var ok = await ctx.Database.CanConnectAsync();
        var conn = ctx.Database.GetDbConnection();
        return Results.Ok(new
        {
            canConnect = ok,
            provider = ctx.Database.ProviderName,
            dataSource = conn.DataSource,
            database = conn.Database
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 500);
    }
});

// Auto-apply migrations in Dev
using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (app.Environment.IsDevelopment())
        await ctx.Database.MigrateAsync();
}

app.Run();
