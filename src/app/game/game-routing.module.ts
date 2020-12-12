import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyComponent } from './lobby/lobby.component';
import { RedeemComponent } from './redeem/redeem.component';

export const routes: Routes = [
  {
    path: '',
    component: LobbyComponent,
  },
  {
    path: 'redeem',
    component: RedeemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class GameRoutingModule { }
