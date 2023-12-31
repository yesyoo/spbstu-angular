import { Injectable } from '@angular/core';
import { OrdersRestService } from '../orders-rest/orders-rest.service';
import { Observable, Subject } from 'rxjs';
import { IOrder } from 'src/app/models/orders';
import { IUserInfo } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


 

  constructor(private ordersServiceRest: OrdersRestService) { }



  getOrders(userId: string ) {
    return this.ordersServiceRest.getToursByUserId(userId)
  }

  sendOrderData(data:{order: IOrder, user: IUserInfo}): Observable<any> { 
    return this.ordersServiceRest.sendOrder(data);
  };
  
  deleteOrderById(id: string): Observable<any> {
    return this.ordersServiceRest.deleteOrderById(id)
  }
}
