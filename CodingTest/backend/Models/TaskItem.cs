using System.ComponentModel.DataAnnotations;

namespace TaskApi.Models
{
    public enum Priority { Low, Medium, High, Critical }
    public enum Status { Todo, InProgress, Done, Blocked }

    public class TaskItem
    {
        public int Id { get; set; }

        [Required, MaxLength(120)]
        public string Title { get; set; } = null!;

        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }

        [Required] public Priority Priority { get; set; } = Priority.Medium;
        [Required] public Status Status { get; set; } = Status.Todo;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}