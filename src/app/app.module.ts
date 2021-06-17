import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {CoreModule} from '@core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@core/modules/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {RequestInterceptor} from '@core/helpers/http.interceptor';

// Token getter for JWT module
export function tokenGetter() {
  return localStorage.getItem('token') || '';
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains : ['localhost:3000', 'localhost:3001', 'metl.tv'],
        disallowedRoutes: ['localhost:3000/auth/', 'localhost:3001/auth/', 'metl.tv/auth/']
      }
    }),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
