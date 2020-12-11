import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameService } from './game.service';
import { LobbyComponent } from './lobby/lobby.component';

@NgModule({
  declarations: [
    LobbyComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LobbyComponent,
  ],
  providers: [
    GameService,
  ]
})
export class GameModule { }
