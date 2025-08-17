import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  id!: number;
  task?: Task;
  error?: string;
  loading = true;

  constructor(private route: ActivatedRoute, private router: Router, private api: TaskService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) { this.error = 'Invalid task id.'; this.loading = false; return; }

    this.api.getTask(this.id).subscribe({
      next: t => { this.task = t; this.loading = false; },
      error: () => { this.error = 'Failed to load task'; this.loading = false; }
    });
  }

  edit() { this.router.navigate(['/tasks', this.id, 'edit']); }
  back() { this.router.navigate(['/tasks']); }
}
