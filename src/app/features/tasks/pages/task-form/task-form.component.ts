import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../models/task.model';
import { TaskService } from '../../../../services/task.service';

// to avoid extra imports/files
function dueDateNotPast(control: AbstractControl): ValidationErrors | null {
  const v = control.value as Date | null;
  if (!v) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(v);   d.setHours(0, 0, 0, 0);
  return d < today ? { pastDate: true } : null;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  id?: number;
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      description: [''],
      dueDate: [null, [dueDateNotPast]],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  // safe wrapper
  get isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  get fc() { return this.taskForm.controls as Record<string, AbstractControl>; }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && this.router.url.endsWith('/edit')) {
      this.id = Number(idParam);
      this.taskService.getTask(this.id).subscribe(task => {
        // in the case where backend returns dueDate = ISO string then Angular datepicker will still accept
        this.taskForm.patchValue(task);
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const payload = this.taskForm.value as Task;

    if (this.id) {
      this.taskService.updateTask(this.id, payload).subscribe(() => {
        this.router.navigate(['/tasks', this.id]);
      });
    } else {
      this.taskService.createTask(payload).subscribe((t) => {
        // nav to created task's detail page if ID returned, otherwise go to list
        const target = t && (t as any).id ? ['/tasks', (t as any).id] : ['/tasks'];
        this.router.navigate(target);
      });
    }
  }

  cancel(): void {
    this.router.navigate([this.id ? `/tasks/${this.id}` : '/tasks']);
  }
}
