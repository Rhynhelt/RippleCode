import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { loadingInterceptor } from './services/interceptors/loading.interceptor';
import { errorInterceptor } from './services/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
    provideAnimations(),
    provideClientHydration(),
    importProvidersFrom(MatSnackBarModule)
  ]
};
