import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-base-url.token';
import { Task, PagedResult, Priority, Status } from '../models/task.model';

export interface TaskQuery {
  title?: string;
  priority?: Priority | '';
  status?: Status | '';
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  /** Normalize base: strip trailing slashes and a trailing `/api` if present */
  private get apiRoot(): string {
    const noSlash = this.baseUrl.replace(/\/+$/, '');
    return noSlash.replace(/\/api$/i, '');
  }

  /** Build endpoint URL safely */
  private url(path = ''): string {
    const suffix = path ? `/${String(path).replace(/^\/+/, '')}` : '';
    return `${this.apiRoot}/api/tasks${suffix}`;
  }

  getTasks(q: TaskQuery): Observable<PagedResult<Task>> {
    let params = new HttpParams();
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params = params.set(k, String(v));
    });
    return this.http.get<PagedResult<Task>>(this.url(), { params });
  }

  getTask(id: number) { return this.http.get<Task>(this.url(id)); }
  createTask(payload: Partial<Task>) { return this.http.post<Task>(this.url(), payload); }
  updateTask(id: number, payload: Partial<Task>) { return this.http.put<Task>(this.url(id), payload); }
  deleteTask(id: number) { return this.http.delete(this.url(id)); }
}
