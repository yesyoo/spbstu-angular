import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  psw: string;
  pswNew: string;
  pswRepeat: string;
  passwordForm: FormGroup;
  user: IUser;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.passwordForm = new FormGroup(
      {
        psw: new FormControl('', {validators: Validators.required}),
        pswNew: new FormControl('', {validators: Validators.required}),
        pswRepeat: new FormControl('', {validators: Validators.required})
      }
    );
  };
  onSubmit(): void {
    if(this.passwordForm.value.pswNew === this.passwordForm.value.pswRepeat) {
      if(this.user.psw === this.passwordForm.value.psw) {
        if(this.user.psw !== this.passwordForm.value.pswNew) {

          this.authService.updateUserPassword(this.user, this.passwordForm.value.pswNew)
          this.messageService.add({severity:'success', summary:'Пароль изменен'})
          console.log('psw updated, new psw:', this.user.psw)

        } else { 
          this.messageService.add({severity:'error', summary:'Старый и новый пароли совпадают, придумайте новый пароль'})
          console.log('Старый и новый пароли совпадают, придумайте новый пароль') 
        }
      } else { 
        this.messageService.add({severity:'error', summary:'Неверный пароль'})
        console.log('Неверный пароль') 
      }
    } else { 
      this.messageService.add({severity:'warn', summary:'Новый пароль не совпадает'})
      console.log('Новый пароль не совпадает') 
    }
  };
};
