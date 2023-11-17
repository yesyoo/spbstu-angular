import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { ITour, ITourTypeSelect, INearestTour, ITourLocation, ITourTest } from '../../models/tours';
import { Observable, Subject, map, BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable(); 

  private testBehaviorSubjectForSettings = new BehaviorSubject<ITourTypeSelect | null>(null)
  readonly ticketTypeBehavior$ = this.testBehaviorSubjectForSettings.asObservable(); 
  
  constructor(private ticketServiceRest: RestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTours = value.filter((el) => el.type === 'single')
        return value.concat(singleTours)
     }))
  };
  
  updateTour(type:ITourTypeSelect): void {
    this.ticketSubject.next(type);
    this.testBehaviorSubjectForSettings.next(type)
  };

  getError():Observable<any>  {
    return this.ticketServiceRest.getRestError()
  };

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets()
  };

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList()
  };

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.ticketServiceRest.getRandomNearestEvent(type)
  };

  transformData(data: INearestTour[], location: ITourLocation[]): ITourTest[] {
    const newTicketData: ITourTest[] = []
    data.forEach((el) => {
      const newTour = <ITourTest> {...el}; // copy
      newTour.region = location.find((location) => location.id === el.locationId) as ITourTest
      newTicketData.push(newTour)
    });
    return newTicketData
  };

  sendTourData(data: any): Observable<any> { 
    return this.ticketServiceRest.sendTourData(data);
  };
}
