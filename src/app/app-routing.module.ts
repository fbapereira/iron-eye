import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { LobbyComponent } from './game/lobby/lobby.component';

const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }