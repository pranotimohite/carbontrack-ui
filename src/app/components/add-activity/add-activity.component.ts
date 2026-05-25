import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Activity, ActivityService } from '../../services/activity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    RouterLink,
    MatToolbarModule, MatCardModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {
  form = this.fb.nonNullable.group({
    type: ['', Validators.required],
    value: ['', Validators.required],
    unit: ['', Validators.required]
  });

  types = [
    { value: 'car', view: 'Car' },
    { value: 'flight', view: 'Flight' },
    { value: 'train', view: 'Train' }
  ];

  constructor(private fb: FormBuilder, private svc: ActivityService, private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      const activity: Activity = {
      type: this.form.value.type!,
      value: Number(this.form.value.value),   // ✅ convert string → number
      unit: this.form.value.unit!
    };
      this.svc.addActivity(activity);
      this.router.navigate(['/']);
    }
  }
}