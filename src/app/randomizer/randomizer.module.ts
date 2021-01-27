import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { ListItemComponent } from './list-item/list-item.component';



@NgModule({
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class RandomizerModule { }
