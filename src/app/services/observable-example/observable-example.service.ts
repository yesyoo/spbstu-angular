import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {

  private myBehaviorSubject = new BehaviorSubject<string>('some data behaviorSub');
  private mySubject = new Subject<string>();
  private myObservable = new Observable<string>((subscriber => {
    setTimeout(() => {
      subscriber.next('someValue'); 
    }, 3000)
  }));

  constructor() { }

  getObservable(): Observable<string> {
    return this.myObservable
  };

  getSubject(): Subject<string> {
    return this.mySubject
  };

  getBehaviorSubject(): BehaviorSubject<string> {
    return this.myBehaviorSubject
  };
}
