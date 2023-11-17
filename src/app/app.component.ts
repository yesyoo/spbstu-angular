import { Component, OnInit } from '@angular/core';
import { ObservableExampleService } from './services/observable-example/observable-example.service';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  prop: string;

  constructor(private testing: ObservableExampleService,
              private config: ConfigService) {};

  ngOnInit() {
    this.config.configLoad()

    const myObservable = this.testing.getObservable();

    myObservable.subscribe(() => console.log('myObservable test')) // а где дата?
  }

  // ngOnInit() {
  //   const myObservable = this.testing.getObservable();
  //   myObservable.subscribe((data) => {
  //     console.log('first myObservable data', data)

  //   });
  //   myObservable.subscribe((data) => {
  //     console.log('second myObservable data', data)

  //   });

  //   const mySubject = this.testing.getSubject()
  //   mySubject.subscribe((data) => {
  //     console.log('first data subject', data)
  //   });
  //   mySubject.subscribe((data) => {
  //     console.log('second data subject', data)
  //   });
  //   mySubject.next('subject value')


  //   const myBehaviorSubject = this.testing.getBehaviorSubject();
  //   myBehaviorSubject.next('new myBehaviorSub data')
  //   myBehaviorSubject.subscribe((data) => {
  //     console.log('first myBehaviorSubject', data)
  //   })
  // }
}

