import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';

const materialModule = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, ...materialModule),
        provideHttpClient(withXsrfConfiguration({
          cookieName: 'XSRF-TOKEN',
          headerName: 'X-XSRF-TOKEN',
        })),
        provideAnimations()
    ]
})
  .catch(err => console.error(err));
