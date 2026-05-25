import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="login-shell">
      <mat-card class="login-card">
        <h1>Sign In</h1>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" autocomplete="username" />
            <mat-error *ngIf="form.controls.username.hasError('required')">
              Username is required
            </mat-error>
          </mat-form-field>

          <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>

          <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', Validators.required]
  });

  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.errorMessage = '';
    this.loading = true;
    const username = this.form.value.username?.trim() ?? '';

    this.auth.login(username).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = this.formatError(error);
      }
    });
  }

  private formatError(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any).message || 'Unable to login. Please try again.';
    }
    return 'Unable to login. Please try again.';
  }
}
