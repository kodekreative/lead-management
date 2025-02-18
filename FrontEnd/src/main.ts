import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch()), // ✅ Enable fetch API
    importProvidersFrom(MatCommonModule) // Ensure Material dependencies are registered
  ],
}).catch((err) => console.error(err));
