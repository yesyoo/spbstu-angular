import { Injectable } from '@angular/core';
import { IOrder } from '../../../models/orders';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserInfo } from 'src/app/models/users';


@Injectable({
  providedIn: 'root'
})
export class OrdersRestService {

  constructor(private http: HttpClient) { }

  sendOrder(data:{order: IOrder, user: IUserInfo}): Observable<any> { 
    return this.http.post('http://localhost:3000/orders/', data)
  };

  getTours(): Observable<any> {
    return this.http.get('http://localhost:3000/orders/')
  };

  getToursByUserId(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/orders/${userId}`)
  };
  ///
  deleteOrderById(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/orders/${id}`)
  }
}
