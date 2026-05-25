import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" class="app-toolbar" *ngIf="isLoggedIn$ | async">
      <span class="brand">CarbonTrack</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/dashboard" routerLinkActive="active-link">Dashboard</a>
      <a mat-button routerLink="/add" routerLinkActive="active-link">Add Activity</a>
      <a mat-button routerLink="/chat" routerLinkActive="active-link">Chat</a>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>

    <div class="app-shell">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.auth.isLoggedIn$;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.initialize().subscribe((authenticated) => {
      if (authenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
