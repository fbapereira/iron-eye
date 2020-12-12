import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InlineErrorComponent } from './inline-error/inline-error.component';



@NgModule({
  declarations: [InlineErrorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    InlineErrorComponent,
  ]
})
export class SharedModule { }
