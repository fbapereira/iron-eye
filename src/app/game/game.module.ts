import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { RedeemComponent } from './redeem/redeem.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LobbyComponent,
    RedeemComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    LobbyComponent,
    RedeemComponent,
  ],
})
export class GameModule { }
