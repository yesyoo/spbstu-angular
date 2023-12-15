import { Injectable } from '@angular/core';
import { IOrder } from '../../../models/orders';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersRestService {

  constructor(private http: HttpClient) { }

  sendOrder(data: IOrder): Observable<any> { 
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
    console.log('=> del')
    return this.http.delete(`http://localhost:3000/orders/${id}`)
  }
}
