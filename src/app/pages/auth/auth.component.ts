import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isTabCaching: boolean = false;

  constructor() { }

  ngOnInit(): void {
  };
}
