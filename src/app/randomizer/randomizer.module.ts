import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClientJsonpModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { ListItemComponent } from './list-item/list-item.component';
import { ListContainerComponent } from './list-container/list-container.component';



@NgModule({
  declarations: [ListItemComponent, ListContainerComponent],
  exports: [ListContainerComponent],
  imports: [
    SharedModule,
    MatCardModule,
    HttpClientJsonpModule
  ]
})
export class RandomizerModule { }
