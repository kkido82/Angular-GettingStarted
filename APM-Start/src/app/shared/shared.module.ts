import { FormsModule } from '@angular/forms';
import { StarComponent } from './star.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
