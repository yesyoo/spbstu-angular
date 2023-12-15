import { Injectable } from '@angular/core';
import { TicketsRestService } from '../tickets-rest/rest.service';
import { ITour, ITourTypeSelect, INearestTour, ITourLocation, ITourTest } from '../../../models/tours';
import { Observable, Subject, map, BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  // tours filter
  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable(); 
  // tour type
  private testBehaviorSubjectForSettings = new BehaviorSubject<ITourTypeSelect | null>(null)
  readonly ticketTypeBehavior$ = this.testBehaviorSubjectForSettings.asObservable(); 
  // tours render
  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();


  constructor(private ticketServiceRest: TicketsRestService) { }

  getTours(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTours = value.filter((el) => el.type === 'single')
        return value.concat(singleTours)
     }))
  };
  
  updateTourType(type:ITourTypeSelect): void {
    this.ticketSubject.next(type);
    this.testBehaviorSubjectForSettings.next(type)
  };

  updateToursForRender(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  };

  createTour(data: any) {
    console.log('create in ticketservice')
    return this.ticketServiceRest.postTour(data)
  }
  searchTourByName(name: string) {
    return this.ticketServiceRest.searchTourByName(name)
  }


  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
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
      const newTour = <ITourTest> {...el}; 
      newTour.region = location.find((location) => location.id === el.locationId) as ITourTest
      newTicketData.push(newTour)
    });
    return newTicketData
  };

}
