import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderItemComponent } from './order-item/order-item.component';

const routes: Routes = [
  {
    path: '', component: OrderItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
