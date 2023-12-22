import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from '../../../services/config/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IServerError } from 'src/app/models/server-error';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  admin: boolean
  token: string
  // card checkbox
  checked: boolean;
  showCardNumber: boolean;
  
  userDb: IUser
  user: IUser
  constructor(private messageService: MessageService,
              private authService: AuthService, 
              private http: HttpClient) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard
  };

  registration(ev: Event): void | boolean {
    if(this.psw !== this.pswRepeat) {
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'})
      return false
    } else {

      this.user = {
        psw: this.psw,
        cardNumber: this.cardNumber,
        login: this.login,
        email: this.email
      };

      this.http.post<IUser>('http://localhost:3000/users/', this.user)
      .subscribe(response => 
      {
        if(response as IUser) {
          this.userDb = response
          this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'})
        } 
      },
      (err: HttpErrorResponse) => {
        console.log('err', err);
        const serverError = <IServerError>err.error
        this.messageService.add({severity:'warn', summary: serverError.errorText})
      }
    )};
  };
 
  saveUserToLocalStorage(ev: Event): void {
    if(this.checked) {
      this.authService.setUserToLocalStorage(this.userDb);
    };
  };
};
