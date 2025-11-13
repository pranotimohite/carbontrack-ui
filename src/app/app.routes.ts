import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add', component: AddActivityComponent }
];