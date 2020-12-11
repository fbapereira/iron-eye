import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TokenInterceptor} from './shared/token-interceptor.service';

import { HeaderModule } from './header/header.module';
import { UserModule } from './user/user.module';
import {AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNotifierModule } from 'ngx-notifier';
import { GameModule } from './game/game.module';
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
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
