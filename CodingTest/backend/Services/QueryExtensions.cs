using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using TaskApi.Dtos;
using TaskApi.Models;

namespace TaskApi.Services
{
    public static class QueryExtensions
    {
        public static IQueryable<TaskItem> ApplyFilters(this IQueryable<TaskItem> q, TaskQuery query)
        {
            if (!string.IsNullOrWhiteSpace(query.Title))
                q = q.Where(t => t.Title.Contains(query.Title));

            if (!string.IsNullOrWhiteSpace(query.Priority) &&
                Enum.TryParse<Priority>(query.Priority, true, out var pr))
            {
                q = q.Where(t => t.Priority == pr);
            }

            if (!string.IsNullOrWhiteSpace(query.Status))
            {
                var raw = query.Status.Trim();

                // normalize common labels/spaces to enum names
                // e.g. "In Progress" -> "InProgress", "Pending" -> "Todo", "Completed" -> "Done"
                var normalized = raw.Replace(" ", "", StringComparison.OrdinalIgnoreCase);
                normalized = normalized.Equals("Pending", StringComparison.OrdinalIgnoreCase) ? "Todo" :
                             normalized.Equals("Completed", StringComparison.OrdinalIgnoreCase) ? "Done" :
                             normalized;

                if (Enum.TryParse<Status>(normalized, true, out var st))
                {
                    q = q.Where(t => t.Status == st);
                }
            }

            return q;
        }

        public static IQueryable<TaskItem> ApplySort(this IQueryable<TaskItem> q, string? sortBy, string? sortDir)
        {
            var dirDesc = string.Equals(sortDir, "desc", StringComparison.OrdinalIgnoreCase);
            Expression<Func<TaskItem, object>> key = sortBy?.ToLower() switch
            {
                "title" => t => t.Title,
                "duedate" => t => t.DueDate ?? DateTime.MaxValue,
                "priority" => t => t.Priority,
                "status" => t => t.Status,
                _ => t => t.CreatedAt
            };
            return dirDesc ? q.OrderByDescending(key) : q.OrderBy(key);
        }

        public static async Task<PagedResult<T>> ToPagedAsync<T>(this IQueryable<T> q, int page, int size, CancellationToken ct = default)
        {
            var total = await q.CountAsync(ct);
            var items = await q.Skip((page - 1) * size).Take(size).ToListAsync(ct);
            return new PagedResult<T> { Items = items, TotalCount = total, PageNumber = page, PageSize = size };
        }
    }
}
