import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { enumNormalizerInterceptor } from './services/enum-normalizer.interceptor';

// If you already have other interceptors, just add enumNormalizerInterceptor to that same array.
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        enumNormalizerInterceptor
        // , ...yourOtherInterceptors
      ])
    ),
  ]
};
