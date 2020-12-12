import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { RedeemComponent } from './redeem/redeem.component';

import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    LobbyComponent,
    RedeemComponent,
    GameComponent,
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
