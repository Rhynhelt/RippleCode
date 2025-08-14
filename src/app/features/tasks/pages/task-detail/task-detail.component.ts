import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  // Angular DI via inject() avoids “used before initialization” issues
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(TaskService);

  loading = true;
  error?: string;
  task?: Task;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id || Number.isNaN(id)) {
      this.error = 'Invalid task id';
      this.loading = false;
      return;
    }

    this.api.getTask(id).subscribe({
      next: (t) => { this.task = t; this.loading = false; },
      error: () => { this.error = 'Failed to load task'; this.loading = false; }
    });
  }

  edit(): void {
    if (this.task) this.router.navigate(['/tasks', this.task.id, 'edit']);
  }

  back(): void {
    this.router.navigate(['/tasks']);
  }
}
