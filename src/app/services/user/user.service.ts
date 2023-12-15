import { Injectable } from '@angular/core';
import { IUser } from '../../models/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user: IUser;
  private token: string;

  constructor() { }

  getUser(): IUser { 
    return this.user 
  };

  setUser(user: IUser): void {
     this.user = user
  };

  getToken(): string | null {
    return this.token
  };

  getTokenFromLocalStorage(): string | null  {
    const key = localStorage.key(0)
    let userToken: string = ''

    if(key) {
      const lastUser = localStorage.getItem(key)
     // проверить
      if(lastUser) {
        const user = JSON.parse(lastUser)
        if(user) {
          userToken = user.token
        }
      } else { 
        console.log('В localStorage нет сохраненных пользователей')
      }
      return userToken
    } else {
      return null
    }
  };
 
  setToken(token: string): void {
    this.token = token
  };
};
