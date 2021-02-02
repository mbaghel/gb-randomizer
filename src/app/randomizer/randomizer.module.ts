import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ListItemComponent } from './list-item/list-item.component';
import { ListContainerComponent } from './list-container/list-container.component';



@NgModule({
  declarations: [ListItemComponent, ListContainerComponent],
  exports: [ListContainerComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientJsonpModule
  ]
})
export class RandomizerModule { }
