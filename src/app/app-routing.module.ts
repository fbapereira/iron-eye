import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './shared/route-guard/auth.guard';
import { UnAuthGuard } from './shared/route-guard/unauth.guard';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      UnAuthGuard,
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'games',
    loadChildren: './game/game.module#GameModule',
    canActivate: [
      AuthGuard,
    ],
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