import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ITour, ITourTest } from 'src/app/models/tours';
import { ActivatedRoute, Router } from '@angular/router';
import { TiсketsStorageService } from 'src/app/services/ticket/tiсkets-storage/tiсkets-storage.service'
import { IUser, IUserInfo } from 'src/app/models/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { forkJoin, fromEvent, lastValueFrom, pipe, Subject, Subscription, takeLast } from 'rxjs';
import { TicketsService } from '../../../services/ticket/tickets/tickets.service';
import { INearestTour, ITourLocation, TourType } from '../../../models/tours';
import { TicketsRestService } from '../../../services/ticket/tickets-rest/rest.service';
import { IOrder } from '../../../models/orders';
import { OrdersService } from '../../../services/order/orders/orders.service';
import { debounceTime } from 'rxjs';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  // nearestTours: INearestTour[];
  // toursLocation: ITourLocation[];
  toursData: ITour[];
  user: IUser | null;
  userForm: FormGroup;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  ticketSearchInputValue: string;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  // searchTypes = [1, 2, 3];
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketsService,
              private ticketRestService: TicketsRestService,
              private ordersService: OrdersService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.ticket = this.ticketService.getTicket()
    
    if(this.ticket) {
      this.ticketService.getSimilarTours(this.ticket).subscribe(data => this.toursData = data)
    };

    if(!this.ticket) {
      this.ticketService.getTourById(this.route.snapshot.params['id'] as string).subscribe(data => {
        this.ticket = data;
        this.ticketService.getSimilarTours(this.ticket).subscribe(data => this.toursData = data)
      })
    };
    
    
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
    
    // const routeIdParam = this.route.snapshot.paramMap.get('id')
    // const paramValueId = routeIdParam 

    // if(paramValueId) {
    //   const ticketStorage = this.ticketStorage.getStorage()
      // this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      // this.ticketRestService.getTicketById(paramValueId).subscribe(data => {
      //   console.log('data', data)
      // })
    // };    
  };

  ngAfterViewInit(): void {
    if(this.user) {
      this.userForm.controls["cardNumber"].setValue(this.user.cardNumber);
    }
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");

    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)
    ).subscribe((ev: any) => {
      console.log('ev', ev)
      const tourName = (ev.target as HTMLInputElement)?.value;
      this.initSearchTour(tourName)
    })
  };

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe()
  };

  selectDate(ev: Event){
    // console.log('Calendar ev', ev)
  };

  initSearchTour(tourName: string): void {
    if(this.ticketRestSub) {
      this.ticketRestSub.unsubscribe()
    };
    this.ticketRestSub = this.ticketRestService.searchTourByName(tourName).subscribe(data => { this.toursData = data});
  };

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};

    const userId = this.userService.getUser()?.id || null;

    const orderPostData: IOrder = {
      tourId: postData._id,
      userId: userId
    };

    const userPostData: IUserInfo = {
      firstName: postData.firstName, 
      lastName: postData.lastName,
      citizen: postData.citizen,
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      userId: userId
    }
    this.ordersService.sendOrderData({order: orderPostData, user: userPostData}).subscribe(() => {      
      this.messageService.add({severity:'success', summary: 'Заказ оформлен'}) 
      setTimeout(() => {this.router.navigate(['tickets/orders'])}, 1500)
    })
  };
  
  auth(): void {

  };
}