import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameModule } from '../game/game.module';

import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GameModule,
  ],
})
export class HomeModule { }
