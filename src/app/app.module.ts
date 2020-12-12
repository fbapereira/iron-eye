import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderModule } from './header/header.module';
import { UserModule } from './user/user.module';
import {AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { UrlInterceptor } from  './shared/http-interceptor/url.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNotifierModule } from 'ngx-notifier';
import { GameModule } from './game/game.module';
import { AuthInterceptor } from './shared/http-interceptor/auth.interceptor'
import { ExpiredTokenInterceptor } from './shared/http-interceptor/expired-token.interceptor'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    UserModule,
    RouterModule,
    GameModule,
    BrowserAnimationsModule,
    NgxNotifierModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExpiredTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
