import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { TicketsService } from 'src/app/services/ticket/tickets/tickets.service';
import { ITour, ITourTypeSelect } from '../../../models/tours';
import { Router } from '@angular/router';
import { BlockStyleDirective } from 'src/app/directives/block-style.directive';
import { Subscription, fromEvent, debounceTime, take } from 'rxjs'


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit {
  tickets: ITour[] | null;
  ticketsCopy: ITour[];
  private tourUnsubscriber: Subscription;

  searchTicketSub: Subscription;
  ticketSearchValue: string;

  loadCountBlock: boolean; 
  defaultDate: string;

  @ViewChild('tourWrap')  tourWrap: ElementRef;
  @ViewChild('tourWrap', {read: BlockStyleDirective})  blockDirective: BlockStyleDirective;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  constructor(private ticketService: TicketsService,
              private router: Router) {}

  ngOnInit(): void {
    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {
      console.log('data', data);

      let ticketType: string; // ?
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;
      };

      this.loadCountBlock = true; // ?

      setTimeout(() => {
        this.blockDirective.updateItems(); 
        this.blockDirective.initStyle(0); 
      });

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue', dateValue)

        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue); 
        this.tickets.forEach((el) => console.log(el.date)); 
      };
    });

    this.ticketService.getTours().subscribe(
      (data) => {
           this.tickets = data;
           this.ticketsCopy = [...this.tickets];
         
      }
    );
  };
  
  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)
    ).subscribe((ev) => {
      if(this.ticketSearchValue) {
        this.tickets = this.ticketsCopy.filter((el) => el.name.includes(this.ticketSearchValue[0].toUpperCase() || this.ticketSearchValue))
      } else {
        this.tickets = [...this.ticketsCopy]
      }
    });
  };

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  };

  goToTicketInfoPage(data: ITour): void {
    this.ticketService.ticketSub(data)
    this.router.navigate([`/tickets/ticket/${data._id}`])
  };

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background: #e6e6e6')
    this.blockDirective.initStyle(0)
  };
};
