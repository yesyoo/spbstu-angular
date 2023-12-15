import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../models/users';
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
  cardNumber: string;
  authTextButton: string;
  token: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
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
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber,
    };

    this.http.post<{access_token: string, id: string}>('http://localhost:3000/users/'+ authUser.login, authUser).subscribe((data) => {
      
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      authUser.id = data.id
      this.userService.setToken(token);
      console.log('user token', token)
      // this.userService.setToStore(token);
      this.router.navigate(['tickets/ticket-list']);

      
  },
    (err: HttpErrorResponse) => {
      console.log('err', err);
      const serverError = <IServerError>err.error
      this.messageService.add({severity:'warn', summary: serverError.errorText})
    });
  };
  
};
 