import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

import { withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './services/interceptors/loading.interceptor';
import { errorInterceptor } from './services/interceptors/error.interceptor';
import { API_BASE_URL } from './services/api-base-url.token';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),

    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
    { provide: API_BASE_URL, useValue: environment.apiUrl.replace(/\/$/, '') }
  ]
};
