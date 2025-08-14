using System.Net;
using System.Text.Json;

namespace TaskApi.Middleware
{
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try { await next(context); }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unhandled exception");
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/problem+json";
                var problem = new
                {
                    type = "about:blank",
                    title = "An unexpected error occurred.",
                    status = 500,
                    detail = ex.Message,
                    traceId = context.TraceIdentifier
                };
                await context.Response.WriteAsync(JsonSerializer.Serialize(problem));
            }
        }
    }
}