import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { TasksRoutingModule } from './tasks-routing.module';

import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, TasksRoutingModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatIconModule, MatChipsModule,
    MatTableModule, MatPaginatorModule, MatSortModule
  ]
})
export class TasksModule {}