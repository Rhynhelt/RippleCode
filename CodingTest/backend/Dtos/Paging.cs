namespace TaskApi.Dtos
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    public class TaskQuery
    {
        public string? Title { get; set; }
        public string? Priority { get; set; } // enum name
        public string? Status { get; set; }   // enum name
        public string? SortBy { get; set; }   // title, dueDate, priority, status, createdAt
        public string? SortDir { get; set; }  // asc|desc
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}