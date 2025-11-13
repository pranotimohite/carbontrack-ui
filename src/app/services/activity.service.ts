import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Activity {
  type: string;
  value: number;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private activities = new BehaviorSubject<Activity[]>([]);
  activities$ = this.activities.asObservable();

  addActivity(a: Activity) {
    this.activities.next([...this.activities.value, a]);
  }
}