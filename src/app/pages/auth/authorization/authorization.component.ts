import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser, Role } from '../../../models/users';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IServerError } from 'src/app/models/server-error';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  loginText = 'Логин';
  pswText = 'Пароль';
  cardNumberText = 'Номер карты'
  login: string;
  psw: string;
  selectedValue: boolean;
  cardNumber: number;
  authTextButton: string;
  token: string;

  constructor(private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться'
  };

  ngOnDestroy(): void {
  };

  vipStatusSelected(): void {
  };

  onAuth(ev: Event): void {
    let authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    };

    this.http.post<any>('http://localhost:3000/users/'+ authUser.login, authUser).subscribe((data) => {
 
      authUser.role = data.role
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      authUser.id = data.id
      this.userService.setToken(token);
      this.router.navigate(['tickets/ticket-list']); 
      
      console.log('user data:', authUser)
  },
    (err: HttpErrorResponse) => {
      console.log('err', err);
      const serverError = <IServerError>err.error
      this.messageService.add({severity:'warn', summary: serverError.errorText})
    });
  };
};
 