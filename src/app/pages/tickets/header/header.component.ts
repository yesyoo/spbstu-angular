import { Component, OnInit, OnDestroy, Input, Output, OnChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../../models/users';
import { UserService } from '../../../services/user/user.service'
import { IMenuType } from 'src/app/models/menuType';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  time: Date;
  private timerInterval: number;
  
  user: IUser;

  @Input() menuType: IMenuType;
  private settingsActive = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Билеты',
        routerLink: ['ticket-list']
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      }
    ];
    this.timerInterval = window.setInterval(() => {
      this.time = new Date()
    }, 1000);
    this.user = this.userService.getUser()
  };
  ngOnDestroy(): void {
    if(this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
  };

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink:['/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth']
      },
    ];
  };
  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
 }
}
