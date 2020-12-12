import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'games',
    loadChildren: './game/game.module#GameModule',
    canActivate: [AuthGuard],
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // },
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