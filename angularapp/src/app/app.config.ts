import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { jwtInterceptor } from './services/jwt/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { FeedService } from './services/feed.service';
import { LivestockService } from './services/livestock.service';
import { MedicineService } from './services/medicine.service';
import { RequestService } from './services/request.service';
import { FeedbackService } from './services/feedback.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    { provide: AuthService, useClass: AuthService },
    { provide: FeedService, useClass: FeedService },
    { provide: LivestockService, useClass: LivestockService },
    { provide: MedicineService, useClass: MedicineService },
    { provide: RequestService, useClass: RequestService },
    { provide: FeedbackService, useClass: FeedbackService }
  ],
};
