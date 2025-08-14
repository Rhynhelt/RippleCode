<<<<<<< HEAD
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { API_BASE_URL } from './services/api-base-url.token';
import { environment } from '../environments/environment';
=======
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { enumNormalizerInterceptor } from './services/enum-normalizer.interceptor';
>>>>>>> Backend-rework

// If you already have other interceptors, just add enumNormalizerInterceptor to that same array.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
<<<<<<< HEAD
    // use fetch() as Angular recommended for SSR/compat
    provideHttpClient(withFetch()),
    provideAnimations(),
    // point frontend at your API (fallback keeps dev working)
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl ?? 'http://localhost:5000' }
=======
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        enumNormalizerInterceptor
        // , ...yourOtherInterceptors
      ])
    ),
>>>>>>> Backend-rework
  ]
};
