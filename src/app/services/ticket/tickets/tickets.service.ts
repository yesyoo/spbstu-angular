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
  private ticketsTypeSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketsTypeSubject.asObservable(); 
  // tour type
  private ticketsSettingsBehaviorSubject = new BehaviorSubject<ITourTypeSelect | null>(null)
  readonly ticketTypeBehavior$ = this.ticketsSettingsBehaviorSubject.asObservable(); 
  // tours render
  private ticketsSubject = new Subject<ITour[]>();
  readonly tickets$ = this.ticketsSubject.asObservable();
  //goTo
  public ticket: ITour;


  constructor(private ticketServiceRest: TicketsRestService) { }

  getTours(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTours = value.filter((el) => el.type === 'single')
        return value.concat(singleTours)
     }))
  };

  getTourById(data: string): Observable<ITour> {
    return this.ticketServiceRest.getTicketById(data)
  };

  getSimilarTours(data: ITour): Observable<ITour[]> {
    return this.ticketServiceRest.getSimiliarTours(data.country)
  }
  
  updateTourType(type:ITourTypeSelect): void {
    this.ticketsTypeSubject.next(type);
    this.ticketsSettingsBehaviorSubject.next(type)
  };

  updateToursForRender(data: ITour[]) {
    this.ticketsSubject.next(data);
  };

  createTour(data: any) {
    return this.ticketServiceRest.postTour(data)
  }
  searchTourByName(data: string) {
    return this.ticketServiceRest.searchTourByName(data)
  }
  ticketSub(data: ITour) {
    this.ticket = data
  }
  getTicket(): ITour {
    return this.ticket
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
