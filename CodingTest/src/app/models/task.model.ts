// src/app/models/task.model.ts
export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical'
}

export enum Status {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Done = 'Done',
  Blocked = 'Blocked'
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  // Store dates as ISO strings coming from the API
  dueDate?: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
