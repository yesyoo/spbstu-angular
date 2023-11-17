import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ITour, ITourTest } from 'src/app/models/tours';
import { ActivatedRoute } from '@angular/router';
import { TiсketsStorageService } from 'src/app/services/tiсkets-storage/tiсkets-storage.service'
import { IUser } from 'src/app/models/users';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { forkJoin, fromEvent, Subscription } from 'rxjs';
import { TicketsService } from '../../../services/tickets/tickets.service';
import { INearestTour, ITourLocation, TourType } from '../../../models/tours';


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;

  // tours
  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];
  tourData: ITourTest[];

  user: IUser;   
  userForm: FormGroup;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  ticketSearchValue: string;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];
  
  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketsService) {}


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

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe(
      (data) => {
        this.nearestTours = data[0],
        this.toursLocation = data[1]
        this.tourData = this.ticketService.transformData(this.nearestTours, this.toursLocation)
      }
    );
    // forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe(
    //   (data) => {
    //     this.nearestTours = data[0],
    //     this.toursLocation = data[1]
        
    //     let joined: ITourTest[] = [];

    //     this.nearestTours.forEach(first => {
    //       const second = this.toursLocation.find(second => second.id === first.locationId);
    //       if(second) {
    //         let newTour: ITourTest = {
    //           name: second.name,
    //           locationId: first.locationId,
    //           id: first.id,
    //           description: first.description,
    //           tourOperator: first.tourOperator,
    //           price: first.price,
    //           img: first.img,
    //           type: first.type,
    //           date: first.date
    //         }; 
    //         joined.push(newTour);
            
    //       } else { console.log('Не можем получить обьединенный массив туров') };
    //     });
    //     this.joinedTours = joined
    //   });
     
    const routeIdParam = this.route.snapshot.paramMap.get('id')
    const paramValueId = routeIdParam 
    if(paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage()
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
    };    
  };

  ngAfterViewInit(): void {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, "keyup");
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour()
    })
  };

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe()
  };

  selectDate(ev: Event){
    console.log('Calendar ev', ev)
  };

  initSearchTour(): void {
    const type = Math.floor(Math.random() * this.searchTypes.length);
    if(this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe()
    };
    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
      this.tourData = this.nearestTours
    })
  };

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    console.log('postData:', postData);
    console.log('userForm.value:', this.userForm.getRawValue())
    this.ticketService.sendTourData(postData).subscribe()
  };
}