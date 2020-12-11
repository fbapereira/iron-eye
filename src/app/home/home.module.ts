import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import {GameModule} from '../game/game.module';
import { LobbyComponent } from '../game/lobby/lobby.component';


@NgModule({
  declarations: [HomeComponent, LobbyComponent],
  imports: [
    CommonModule,
    RouterModule,
    GameModule,
    LobbyComponent

  ]
})
export class HomeModule { }
