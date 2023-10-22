import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../models/users';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText = 'Логин';
  pswText = 'Пароль';
  cardNumberText = 'Номер карты'
  login: string;
  psw: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    console.log('init')
    this.authTextButton = 'Авторизоваться'
    
  };
  ngOnDestroy(): void {
  };
  vipStatusSelected(): void {
  };

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login
    };


    if(!this.authService.checkUser(authUser)?.error) {
      this.userService.setUser(authUser)
   
      this.messageService.add({severity:'success', summary:'Авторизация прошла успешно'})
      this.router.navigate(['tickets/ticket-list'])
    } else {
      const errotText: any =this.authService.checkUser(authUser);
      this.messageService.add({severity:'warn', summary: errotText?.error || 'Ошибка'})
    }
  };

}
 