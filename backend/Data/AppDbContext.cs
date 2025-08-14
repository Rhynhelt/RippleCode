using Microsoft.EntityFrameworkCore;
using TaskApi.Models;

namespace TaskApi.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<TaskItem> Tasks => Set<TaskItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>(e =>
            {
                e.Property(p => p.Title).IsRequired().HasMaxLength(120);
                e.Property(p => p.Priority).HasConversion<string>();
                e.Property(p => p.Status).HasConversion<string>();
                e.HasIndex(p => p.DueDate);
                e.HasIndex(p => p.Status);
                e.HasIndex(p => p.Priority);
            });
        }
    }
}
