import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe, MatToolbarModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <mat-progress-bar *ngIf="(loading.loading$ | async)" mode="indeterminate"></mat-progress-bar>

    <mat-toolbar color="primary">
      <span>Task Management System</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/tasks">Tasks</button>
    </mat-toolbar>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
  `]
})
export class LayoutComponent {
  loading = inject(LoadingService);
}
