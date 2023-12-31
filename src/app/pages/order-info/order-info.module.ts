import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderInfoRoutingModule } from './order-info-routing.module';
import { OrderInfoComponent } from './order-info/order-info.component';


@NgModule({
  declarations: [
    OrderInfoComponent
  ],
  imports: [
    CommonModule,
    OrderInfoRoutingModule
  ]
})
export class OrderInfoModule { }
