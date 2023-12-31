import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../../models/users';
import { UserService } from '../../../services/user/user.service'
import { IMenuType } from 'src/app/models/menuType';
import { SimpleChanges } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { OrdersService } from '../../../services/order/orders/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  items: MenuItem[];
  exitItem: string
  time: Date;
  private timerInterval: number;
  user: IUser | undefined | null 
  @Input() menuType: IMenuType;
  private settingsActive = true;

  constructor(private userService: UserService,
              private authService: AuthService,
              private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser() 
    this.user ? this.exitItem = 'Выйти' : this.exitItem = 'Вход'
    this.items = this.initMenuItems();
    
    this.timerInterval = window.setInterval(() => {
      this.time = new Date()
    }, 1000);
  };

  ngOnDestroy(): void {
    if(this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
  };

  ngAfterViewInit() {}

  ngOnChanges(ev: SimpleChanges): void {
    if (ev['menuType'].currentValue) {
      this.settingsActive = this.menuType?.type === "extended";
      this.items = this.initMenuItems();
    }
    console.log('ev', ev);
  };

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['ticket-list']
      },
      {
        label: 'Настройки',
        routerLink:['settings'],
        visible: this.settingsActive && !!this.user
      }, 
      {
        label: 'Заказы',
        routerLink:['orders'],
      }, 
      {
        label: this.exitItem,
        routerLink:['auth'],
        command: (ev) => {
            this.removeUser();
        }
      }
    ];
  };

  removeUser(): void {
    this.userService.deleteUser()
  };
};
