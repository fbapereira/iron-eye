import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GameModule } from '../game/game.module';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GameModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
