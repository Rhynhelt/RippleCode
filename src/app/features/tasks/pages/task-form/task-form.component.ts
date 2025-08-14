import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../../services/task.service';
import { Priority, Status, Task } from '../../../../models/task.model';
import { dueDateNotPast } from '../../../../shared/validators/date.validators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  priorities = Object.values(Priority);
  statuses   = Object.values(Status);

  id?: number;
  isEdit = false;

  form = this.fb.group({
    title: this.fb.control<string>('', [Validators.required, Validators.maxLength(120)]),
    description: this.fb.control<string>(''),
    dueDate: this.fb.control<Date | null>(null, [dueDateNotPast()]),
    priority: this.fb.control<Priority>(Priority.Medium, [Validators.required]),
    status: this.fb.control<Status>(Status.Todo, [Validators.required])
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'new') {
      this.isEdit = true;
      this.id = Number(idParam);
      this.api.getTask(this.id).subscribe((t: Task) => {
        this.form.patchValue({
          title: t.title,
          description: t.description ?? '',
          dueDate: t.dueDate ? new Date(t.dueDate) : null,
          priority: t.priority,
          status: t.status
        });
      });
    }
  }

  // pretty much print enum values (InProgress → In Progress, Todo → To Do)
  label(v: string) {
    return v.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^Todo$/, 'To Do');
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const nowIso = new Date().toISOString();

    const taskForApi: Task = {
      id: this.id ?? 0, // 0 for create; backend ignores on POST
      title: v.title!,
      description: v.description?.trim() || '',
      dueDate: v.dueDate ? v.dueDate.toISOString() : undefined,
      priority: v.priority!,
      status: v.status!,
      createdAt: nowIso,   // backend ignores on POST/PUT
      updatedAt: nowIso
    };

    if (this.isEdit && this.id) {
      this.api.updateTask(this.id, taskForApi).subscribe(() => this.router.navigate(['/tasks']));
    } else {
      this.api.createTask(taskForApi).subscribe((t: Task) => this.router.navigate(['/tasks', t.id]));
    }
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
