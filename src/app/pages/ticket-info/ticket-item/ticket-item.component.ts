import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ITour, ITourTest } from 'src/app/models/tours';
import { ActivatedRoute } from '@angular/router';
import { TiсketsStorageService } from 'src/app/services/ticket/tiсkets-storage/tiсkets-storage.service'
import { IUser } from 'src/app/models/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { forkJoin, fromEvent, lastValueFrom, pipe, Subject, Subscription, takeLast } from 'rxjs';
import { TicketsService } from '../../../services/ticket/tickets/tickets.service';
import { INearestTour, ITourLocation, TourType } from '../../../models/tours';
import { TicketsRestService } from '../../../services/ticket/tickets-rest/rest.service';
import { IOrder } from '../../../models/orders';
import { OrdersService } from '../../../services/order/orders/orders.service';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  // tours
  // nearestTours: INearestTour[];
  // toursLocation: ITourLocation[];
  tourData: ITour[];

  user: IUser;   
  userForm: FormGroup;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  ticketSearchInputValue: string;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];

  
  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketsService,
              private ticketRestService: TicketsRestService,
              private ordersService: OrdersService) {}


  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.userForm = new FormGroup(
      {
        firstName: new FormControl('', {validators: Validators.required}),
        lastName: new FormControl('', {validators: Validators.required}),
        cardNumber: new FormControl(),
        birthDay: new FormControl(),
        age: new FormControl(),
        citizen: new FormControl()
      }
    );

    // forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe(
    //   (data) => {
    //     this.nearestTours = data[0],
    //     this.toursLocation = data[1]
    //     this.tourData = this.ticketService.transformData(this.nearestTours, this.toursLocation)
    //   }
    // );
    
    const routeIdParam = this.route.snapshot.paramMap.get('id')
    const paramValueId = routeIdParam 

    if(paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage()
      // this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      this.ticketRestService.getTicketById(paramValueId).subscribe(data => {
        this.ticket = data
        console.log('data', data)
      })
    };    
    this.ticketService.getTours().subscribe(data => this.tourData = data)
  };

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      console.log('ev', ev)
      this.initSearchTour()
    })
  };

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe()
  };

  selectDate(ev: Event){
    // console.log('Calendar ev', ev)
  };

  
  initSearchTour(): void {
    // const type = Math.floor(Math.random() * this.searchTypes.length);
    if(this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe()
    };
    //мы не отписываемся :(
    const inputObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = inputObserver.pipe(
      debounceTime(2000)
    ).subscribe((ev) => { });
        
    // this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
    //   this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    //   this.tourData = this.nearestTours
    // })
  };

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    const userId = this.userService.getUser()?.id || null;

    const postObj: IOrder = {
      firstName: postData.firstName,
      lastName: postData.lastName,
      citizen: postData.citizen,
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId
    };
    this.ordersService.sendOrderData(postObj).subscribe()
  };
}