import { Injectable } from '@angular/core';
import { OrdersRestService } from '../orders-rest/orders-rest.service';
import { Observable, Subject } from 'rxjs';
import { IOrder } from 'src/app/models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersSubject = new Subject<IOrder[]>();
  readonly orders$ = this.ordersSubject.asObservable();

  constructor(private ordersServiceRest: OrdersRestService) { }

  getOrdersByUserId(userId: string): void {
    this.ordersServiceRest.getToursByUserId(userId).subscribe(data => {
      this.ordersSubject.next(data)
    })
  };

  sendOrderData(data: IOrder): Observable<IOrder> { 
    return this.ordersServiceRest.sendOrder(data);
  };
  deleteOrderById(id: string): Observable<any> {
    return this.ordersServiceRest.deleteOrderById(id)
  }
}
