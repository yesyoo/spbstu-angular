import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IServerError } from 'src/app/models/server-error';
import { Router } from '@angular/router';

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
  user: IUser | null;

  constructor(private userService: UserService,
              private messageService: MessageService,
              private authService: AuthService,
              private router: Router) { }

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
    const fields = this.passwordForm.getRawValue()
    const user = this.userService.getUser()
    if(user) {
      if(fields.pswNew !== fields.pswRepeat) {
        this.messageService.add({severity:'warn', summary:'Новый пароль не совпадает'})
      } else {
        this.authService.updatePassword(user, fields.psw, fields.pswNew).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'Пароль изменен'});
          setTimeout(() => {
            this.userService.deleteUser()
            console.log(this.userService.getUser())
            {this.router.navigate(['auth'])}
  
          }, 1500)
        },
        (err: HttpErrorResponse) => {
          const serverError = <IServerError>err.error
          this.messageService.add({severity:'warn', summary: serverError.errorText})
        });
      }

    }
    
  };
};
