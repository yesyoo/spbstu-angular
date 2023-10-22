import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { ITour } from '../../models/tours'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  constructor(private ticketServiceRest: RestService) { }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets()
  };
}
