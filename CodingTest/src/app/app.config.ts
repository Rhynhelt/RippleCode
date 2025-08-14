import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_BASE_URL } from './services/api-base-url.token';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // use fetch() as Angular recommended for SSR/compat
    provideHttpClient(withFetch()),
    provideAnimations(),
    // point frontend at your API (fallback keeps dev working)
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl ?? 'http://localhost:5000' }
  ]
};
