import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import { ITour } from '../../../models/tours';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockStyleDirective } from 'src/app/directives/block-style.directive';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  @ViewChild('tourWrap')  tourWrap: ElementRef;
  @ViewChild('tourWrap', {read: BlockStyleDirective})  blockDirective: BlockStyleDirective;


  constructor(private ticketService: TicketsService,
              private ticketsStorageService: TiсketsStorageService,
              private router: Router) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((data) => {
   
    for(let i = 0; i < data.length; i++){
      data[i].id = (i + 1).toString()
    };
      this.tickets = data;
      this.ticketsStorageService.setStorage(data);
    })
    
  };
  ngAfterViewInit() {};

  goToTicketInfoPage(id: string): void {
    this.router.navigate([`/tickets/ticket/${id}`])
  };

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background: grey')
    this.blockDirective.initStyle(0)
  };
}
