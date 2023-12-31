import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../models/users';
import { OrdersService } from '../../../services/order/orders/orders.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit, OnDestroy {

  orders: any
  user: IUser | null;

  constructor(private userService: UserService,
              private ordersService: OrdersService) { }

  ngOnInit(): void { 
    this.user = <IUser>this.userService.getUser();
    if (this.user) { 
      this.ordersService.getOrders(this.user.id).subscribe((data) => this.orders = data)
    }
  };

  ngOnDestroy(): void {
  };

  deleteOrder(id: string): void {
    this.ordersService.deleteOrderById(id)
  };
}
