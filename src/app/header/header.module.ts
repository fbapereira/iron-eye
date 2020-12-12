import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { GameModule } from '../game/game.module';



@NgModule({
  declarations: [ HeaderComponent ],
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
