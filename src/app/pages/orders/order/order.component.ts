import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { IOrder } from '../../../models/orders';
import { TicketsService } from '../../../services/ticket/tickets/tickets.service';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../models/users';
import { OrdersService } from '../../../services/order/orders/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: IOrder[];
  user: IUser | null;

  constructor(private userService: UserService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    if(this.user?.id) {
      this.ordersService.getOrdersByUserId(this.user.id)
      this.ordersService.orders$.subscribe(data => {
      this.orders = data;
      })
    }
  };
  ngOnDestroy(): void {
  };
  deleteOrder(id: string): void {
    this.ordersService.deleteOrderById(id)
  };
}
