import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs';
import { Task } from '../../../../models/task.model';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'dueDate', 'priority', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);

  // filter options (match model values)
  priorities: Array<Task['priority']> = ['Low', 'Medium', 'High'];
  statuses: Array<Task['status']> = ['Pending', 'InProgress', 'Completed'];

  filters: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.filters = this.fb.group({
      title: [''],
      priority: [''],
      status: ['']
    });
  }

  // Angular templates don't know global navigator
  get isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  ngOnInit(): void {
    // filtering logic
    this.dataSource.filterPredicate = (data: Task, filterJson: string) => {
      const f = JSON.parse(filterJson || '{}') as { title?: string; priority?: string; status?: string };
      const matchesTitle =
        !f.title || (data.title ?? '').toLowerCase().includes(String(f.title).toLowerCase());
      const matchesPriority = !f.priority || data.priority === f.priority;
      const matchesStatus = !f.status || data.status === f.status;
      return matchesTitle && matchesPriority && matchesStatus;
    };

    // react to filter
    this.filters.valueChanges.pipe(debounceTime(200)).subscribe(() => this.applyFilter());

    // init load
    this.loadTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.dataSource.data = tasks || [];
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const { title, priority, status } = this.filters.value;
    this.dataSource.filter = JSON.stringify({ title, priority, status });
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  clearFilters(): void {
    this.filters.reset({ title: '', priority: '', status: '' });
  }

  pageChange(): void {
  }

  sortChange(): void {
  }

  deleteTask(id: number): void {
    if (confirm('Delete this task? This action cannot be undone.')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}