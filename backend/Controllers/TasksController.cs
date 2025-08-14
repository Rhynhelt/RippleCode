using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/tasks")] // exact
    public class TasksController(AppDbContext db) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll(CancellationToken ct)
            => Ok(await db.Tasks.AsNoTracking().ToListAsync(ct));

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TaskItem>> GetById(int id, CancellationToken ct)
        {
            var t = await db.Tasks.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            return t is null ? NotFound() : Ok(t);
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> Create([FromBody] TaskItem input, CancellationToken ct)
        {
            db.Tasks.Add(input);
            await db.SaveChangesAsync(ct);
            return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskItem input, CancellationToken ct)
        {
            var entity = await db.Tasks.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (entity is null) return NotFound();

            entity.Title = input.Title;
            entity.Description = input.Description;
            entity.DueDate = input.DueDate;
            entity.Priority = input.Priority;
            entity.Status = input.Status;
            entity.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync(ct);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            var entity = await db.Tasks.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (entity is null) return NotFound();
            db.Tasks.Remove(entity);
            await db.SaveChangesAsync(ct);
            return NoContent();
        }
    }
}
