import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { ActivityService } from '../../services/activity.service';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule, RouterLink, MatToolbarModule, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  types = ['Car', 'Flight', 'Train'];
  chartData: ChartData<'pie'> = { labels: this.types, datasets: [{ data: [0,0,0] }] };
  chartType: ChartType = 'pie';

  constructor(private svc: ActivityService) {
    this.svc.activities$.subscribe(list => {
      const counts = this.types.map(t => list.filter(a => a.type.toLowerCase() === t.toLowerCase()).length);
      this.chartData = { labels: this.types, datasets: [{ data: counts }] };
    });
  }
}