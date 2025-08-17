using System.ComponentModel.DataAnnotations;
using TaskApi.Models;

namespace TaskApi.Dtos
{
    public record TaskDto(
        int Id,
        string Title,
        string? Description,
        DateTime? DueDate,
        Priority Priority,
        Status Status,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );

    public class CreateTaskDto
    {
        [Required, MaxLength(120)]
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public Priority Priority { get; set; } = Priority.Medium;
        public Status Status { get; set; } = Status.Todo;
    }

    public class UpdateTaskDto : CreateTaskDto { }
}