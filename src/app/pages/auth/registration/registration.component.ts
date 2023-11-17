import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfigService } from '../../../services/config/config.service';


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
  token: string
  // card checkbox
  checked: boolean;
  showCardNumber: boolean;
  newUser: IUser
 
  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard
  };

  registration(ev: Event): void | boolean {
    if(this.psw !== this.pswRepeat) {
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'})
      return false
    };

    const user: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email,
      token: Math.ceil(Math.random() * 10000).toString()
    };
    
    if(!this.authService.checkUserInLocalStorage(user)) {
      this.authService.setUserToUsersStorage(user)
      this.newUser = user
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'})
    } else {
        this.messageService.add({severity:'warn', summary:'Пользователь уже существует'})
    };
  };
 
  saveUserToLocalStorage(ev: Event): void {
    if(this.checked) {
      this.authService.setUserToLocalStorage(this.newUser);
    };
  };
};
