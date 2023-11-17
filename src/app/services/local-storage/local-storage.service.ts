import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  getUser(user: IUser): IUser | null {
    let checkUser;
    const userExists = localStorage.getItem('user_' + user.login)
    if(userExists) {
      checkUser = JSON.parse(userExists)
    }
    return checkUser
  };

  setUser(user: IUser): void {
    localStorage.setItem(`user_${user.login}`, JSON.stringify(user))
  };

  deleteUser(user: IUser): void {
    localStorage.removeItem(`user_${user.login}`)
  };
}
