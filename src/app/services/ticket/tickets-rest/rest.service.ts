import { Injectable } from '@angular/core';
import { ITour } from 'src/app/models/tours';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INearestTour, ITourLocation } from '../../../models/tours';


@Injectable({
  providedIn: 'root'
})
export class TicketsRestService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tours')
  };

  getTicketById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`http://localhost:3000/tours/id?id=${id}`)
  };

  getSimiliarTours(country: string): Observable<ITour[]> {
    console.log('=.')
    return this.http.get<ITour[]>(`http://localhost:3000/tours/country?country=${country}`)
  }

  postTour(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/tour-item', data, {headers: {}})
  }
  searchTourByName(name: string): Observable<ITour[]> {
    return this.http.get<ITour[]>(`http://localhost:3000/tours/tourname?tourname=${name}`)
  };





  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  };

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/')
  };

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  };

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    console.log('getRandomNearestEvent(type: number)')
    switch(type) {
      case 0:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours1.json')
      case 1:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
      case 3: 
        return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json')
      default:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
    }
  };
}
