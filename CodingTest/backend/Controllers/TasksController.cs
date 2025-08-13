using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Dtos;
using TaskApi.Models;
using TaskApi.Services;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController(AppDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<PagedResult<TaskDto>>> Get([FromQuery] TaskQuery query, CancellationToken ct)
        {
            var q = db.Tasks.AsNoTracking()
                .ApplyFilters(query)
                .ApplySort(query.SortBy, query.SortDir)
                .Select(t => new TaskDto(t.Id, t.Title, t.Description, t.DueDate, t.Priority, t.Status, t.CreatedAt, t.UpdatedAt));

            var page = await q.ToPagedAsync(query.PageNumber, query.PageSize, ct);
            return Ok(page);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TaskDto>> GetById(int id, CancellationToken ct)
        {
            var t = await db.Tasks.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t is null) return NotFound(Problem(title: "Task not found", statusCode: 404));
            return new TaskDto(t.Id, t.Title, t.Description, t.DueDate, t.Priority, t.Status, t.CreatedAt, t.UpdatedAt);
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> Create([FromBody] CreateTaskDto dto, CancellationToken ct)
        {
            var entity = new TaskItem
            {
                Title = dto.Title.Trim(),
                Description = dto.Description,
                DueDate = dto.DueDate,
                Priority = dto.Priority,
                Status = dto.Status
            };
            db.Tasks.Add(entity);
            await db.SaveChangesAsync(ct);
            var result = new TaskDto(entity.Id, entity.Title, entity.Description, entity.DueDate, entity.Priority, entity.Status, entity.CreatedAt, entity.UpdatedAt);
            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, result);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TaskDto>> Update(int id, [FromBody] UpdateTaskDto dto, CancellationToken ct)
        {
            var entity = await db.Tasks.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (entity is null) return NotFound(Problem(title: "Task not found", statusCode: 404));

            entity.Title = dto.Title.Trim();
            entity.Description = dto.Description;
            entity.DueDate = dto.DueDate;
            entity.Priority = dto.Priority;
            entity.Status = dto.Status;
            entity.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync(ct);
            var result = new TaskDto(entity.Id, entity.Title, entity.Description, entity.DueDate, entity.Priority, entity.Status, entity.CreatedAt, entity.UpdatedAt);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            var entity = await db.Tasks.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (entity is null) return NotFound(Problem(title: "Task not found", statusCode: 404));
            db.Tasks.Remove(entity);
            await db.SaveChangesAsync(ct);
            return NoContent();
        }
    }
}