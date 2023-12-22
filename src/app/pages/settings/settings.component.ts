
import { Component, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ObservableExampleService } from '../../services/observable-example/observable-example.service'
import { SettingsService } from '../../services/settings/settings.service';
import { TicketsService } from '../../services/ticket/tickets/tickets.service';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../models/users';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: IUser | null;

  // private subjectScope: Subject<string>
  // private subjectSubscribe: Subscription;
  // settingsData: Subscription;
  // settingsDataSubject: Subscription;
  private subjectForUnsubscribe = new Subject();
  
  constructor(private observableExampleService: ObservableExampleService,
              private settingsService: SettingsService,
              private ticketService: TicketsService,
              private userService: UserService) {};

  ngOnInit() {
    this.user = this.userService.getUser()
    console.log('user:', this.user)
    // this.subjectScope = this.observableExampleService.getSubject();
    // this.subjectScope.subscribe((data) => {
    //   console.log('data:', data)
    // });
    // this.subjectSubscribe = this.subjectScope.subscribe((data: string) => {
    //   console.log('data:', data)
    // });
    // this.subjectScope.next('value from settings.component');
    // userSettings =>
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data)
    });
    this.settingsService.getSettingsSubjectObservable().pipe(
      take(1)
    ).subscribe((data) => console.log('settings data from subject', data))
    this.ticketService.ticketTypeBehavior$.pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(data => console.log('test', data))
  };
 
  ngOnDestroy() {
    this.subjectForUnsubscribe.next(true)
    this.subjectForUnsubscribe.complete()
  };
};
