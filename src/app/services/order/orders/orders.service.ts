import { Injectable } from '@angular/core';
import { OrdersRestService } from '../orders-rest/orders-rest.service';
import { Observable, Subject } from 'rxjs';
import { IOrder } from 'src/app/models/orders';
import { IUserInfo } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private userOrdersSubject = new Subject<IOrder[]>();
  readonly userOrders$ = this.userOrdersSubject.asObservable();

  constructor(private ordersServiceRest: OrdersRestService) { }

  getOrdersByUserId(userId: string): void {
    this.ordersServiceRest.getToursByUserId(userId).subscribe(data => this.userOrdersSubject.next(data))
  };

  sendOrderData(data:{order: IOrder, user: IUserInfo}): Observable<any> { 
    return this.ordersServiceRest.sendOrder(data);
  };
  
  deleteOrderById(id: string): Observable<any> {
    return this.ordersServiceRest.deleteOrderById(id)
  }
}
