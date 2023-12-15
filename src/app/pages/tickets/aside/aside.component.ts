import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';
import { ITourTypeSelect } from 'src/app/models/tours';
import { TicketsService } from '../../../services/ticket/tickets/tickets.service';
import { MessageService } from 'primeng/api';
import { SettingsService } from '../../../services/settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { ITour } from 'src/app/models/tours';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  tourTypes: ITourTypeSelect[];
  defaultDate: Date = new Date(2022, 9, 27);
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()
 
  constructor(private ticketService: TicketsService,
              private messageService: MessageService,
              private settingsService: SettingsService,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'extended', label : 'Расширенное'},
      {type: 'custom', label : 'Обычное'}
    ];
    this.tourTypes = [
      {label: 'Все', value: 'all'},
      {label: 'Одиночный', value: 'single'},
      {label: 'Групповой', value: 'multi'}
    ];
  };

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  };

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTourType(ev.value)
  };
  selectDate(ev: string) {
    console.log('ev selected date', ev)
    this.ticketService.updateTourType({date:ev}) 
    // отстаем на 1 сутки, время 00:00:00 (+ 3 часа - в этом проблема)
  };
  
   initRestError(): void {
    this.ticketService.getError().subscribe({
      next:(data)=> {},
      error: (err) => {
        console.log('err', err)
        this.messageService.add({severity:'warn', summary: err?.error || 'Ошибка'})
      }
    });
  };

  initSettingsData():void {
    console.log('initSettingsData() =>')
    this.settingsService.loadUserSettingsSubject(
      { saveToken: false }
    );
  };

  initTours(): void {
    this.http.post('http://localhost:3000/tours/', {}).subscribe((data) => {
        this.ticketService.updateToursForRender(data as ITour[])
    })
  };

  deleteTours(): void {
    this.http.delete('http://localhost:3000/tours/').subscribe(data => {
      this.ticketService.updateToursForRender(data as ITour[])
    })
  };
};
