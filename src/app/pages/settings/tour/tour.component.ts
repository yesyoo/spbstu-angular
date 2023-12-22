import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../../services/ticket/tickets/tickets.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  tourForm: FormGroup;

  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {
    this.tourForm = new FormGroup(
      {
        name: new FormControl('', {validators: Validators.required}),
        description: new FormControl(''),
        operator: new FormControl(''),
        price: new FormControl(''),
        img: new FormControl(),
        country: new FormControl(),
        city: new FormControl()
      });
  };
  
  createTour(): void {
    const tourDataRow = this.tourForm.getRawValue();
    let formParams = new FormData() // отправляем данные 2х типов, создаем formdata и копируем всю дату из формы в него
    
    if(typeof tourDataRow === "object") {
      for(let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop])
      }
    };
    this.ticketsService.createTour(formParams).subscribe(data => {})
  };

  selectFile(ev: any): void {
    console.log('ev', ev)
    if(ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.tourForm.patchValue({img: file});
    }
  };
}
