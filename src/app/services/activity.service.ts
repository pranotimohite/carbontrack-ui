import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

export interface Activity {
  type: string;
  value: number;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private http = inject(HttpClient);
  private activities = new BehaviorSubject<Activity[]>([]);
  activities$ = this.activities.asObservable();
  isLoggedInSubject: any;

  addActivity(a: Activity) {
    this.activities.next([...this.activities.value, a]);
    return this.http.post('/api/activities', this.activities.value, {
      withCredentials: true
    }).pipe(
      tap(() => {
        localStorage.setItem('auth.loggedIn', 'true');
        this.isLoggedInSubject.next(true);
      }),
      map(() => void 0),
      catchError((err) => {
        console.error('Activity POST failed:', err);
        return throwError(() => err);
      })
    );
  }
}