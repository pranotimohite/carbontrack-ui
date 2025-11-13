import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule, NgChartsModule)
  ]
};