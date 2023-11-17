import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../../models/users';
import { UserService } from '../../../services/user/user.service'
import { IMenuType } from 'src/app/models/menuType';
import { SimpleChanges } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  items: MenuItem[];
  time: Date;
  private timerInterval: number;
  user: IUser | undefined; 
  @Input() menuType: IMenuType;
  private settingsActive = true;

  constructor(private userService: UserService,
              private authService: AuthService,
              private el: ElementRef) { }

  ngOnInit(): void {
    this.items = this.initMenuItems();
    
    this.timerInterval = window.setInterval(() => {
      this.time = new Date()
    }, 1000);

    this.user = this.userService.getUser() 
    // setTimeout(() => {console.log('user:', this.user?.login)}, 3000)
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
        visible: this.settingsActive
      }, 
      {
        label: 'Выйти',
        routerLink:['auth'],
        command: (ev) => {
            this.removeUser();
        }
      }
    ];
  };

  removeUser(): void {
    const activeUser = this.userService.getUser();
    if (activeUser) {
      this.authService.deleteUser(activeUser)
    }
  };
};
