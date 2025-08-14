// src/app/features/tasks/pages/task-list/task-list.component.ts
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime } from 'rxjs';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TaskService, TaskQuery } from '../../../../services/task.service';
import { PagedResult, Priority, Status, Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  // Avoids "used before initialization" with class field initializers
  private fb = inject(FormBuilder);
  private api = inject(TaskService);
  private dialog = inject(MatDialog);

  displayedColumns = ['title', 'dueDate', 'priority', 'status', 'actions'];
  data: Task[] = [];
  total = 0;
  pageSize = 10;

  // Strongly-typed default query
  query: TaskQuery = {
    pageNumber: 1,
    pageSize: this.pageSize,
    sortBy: 'createdAt',
    sortDir: 'desc'
  };

  priorities = Object.values(Priority);
  statuses = Object.values(Status);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Form values can be null; type them accordingly
  filterForm = this.fb.group({
    title: ['' as string | null],
    priority: ['' as '' | Priority | null],
    status: ['' as '' | Status | null]
  });

  ngOnInit(): void {
    this.load();

    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(v => {
        // Coerce nulls to the exact TaskQuery shape
        this.query = {
          ...this.query,
          pageNumber: 1,
          title: v.title ?? undefined, // TaskQuery.title?: string | undefined
          priority: (v.priority ?? '') as TaskQuery['priority'],
          status: (v.status ?? '') as TaskQuery['status']
        };
        this.load();
      });
  }

  load(): void {
    this.api.getTasks(this.query).subscribe((res: PagedResult<Task>) => {
      this.data = res.items;
      this.total = res.totalCount;
      this.pageSize = res.pageSize;
    });
  }

  pageChange(e: PageEvent): void {
    this.query = {
      ...this.query,
      pageNumber: e.pageIndex + 1,
      pageSize: e.pageSize
    };
    this.load();
  }

  sortChange(s: Sort): void {
    // Narrow MatSort.active (string) to allowed union
    const allowed: ReadonlyArray<TaskQuery['sortBy']> = [
      'title',
      'dueDate',
      'priority',
      'status',
      'createdAt'
    ];
    const sortBy = (allowed.includes(s.active as any)
      ? (s.active as TaskQuery['sortBy'])
      : 'createdAt');

    const sortDir: 'asc' | 'desc' = (s.direction === 'desc' ? 'desc' : 'asc');

    this.query = { ...this.query, sortBy, sortDir };
    this.load();
  }

  clearFilters(): void {
    this.filterForm.reset({ title: '', priority: '', status: '' });
  }

  delete(id: number): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Delete task?', text: 'This action cannot be undone.' }
      })
      .afterClosed()
      .subscribe(ok => {
        if (ok) this.api.deleteTask(id).subscribe(() => this.load());
      });
  }
}
