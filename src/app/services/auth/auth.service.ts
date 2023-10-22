import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersStorage: IUser[] = [];
  private loginError = {error: 'Логин не совпадает'};
  constructor() { }

  checkUser(user: IUser):  {error: string | boolean} {

    const isUserExists = this.usersStorage.find((el) => el.login === user.login)
    let isUserSavedInStore = localStorage.getItem('user_' + user?.login)
    let userInStore: IUser = <IUser>{}

    if(isUserSavedInStore) {
      userInStore = JSON.parse(isUserSavedInStore)
    };
 
    if(isUserExists) {
      
      return isUserExists.psw === user.psw ? {error: false} : {error: 'Пароли не совпадают'};
    } else if (!isUserSavedInStore) {
      return this.loginError;
    }

    
   if(!isUserExists && isUserSavedInStore) {
    if (userInStore?.login ===user.login) {
      return  userInStore.psw == user.psw  ? {error: false} : {error: 'Пароли не совпадают'}
    } else {
      return this.loginError;
    }
   } 

    return {error : 'Ошибка'}
  };
  checkUserPsw() {}

  isUserExists(user: IUser): boolean {
    if(localStorage.getItem(`user_${user.login}`)) {
      return true
    } else { return false}
    
  };

  setUser(user: IUser): void {
    const isUserExists = this.usersStorage.find(el => el.login === user.login);
    if(!isUserExists && user?.login) {
      this.usersStorage.push(user)
    };
  };
  setUserToLocalStorage(): void {
    const user: IUser = this.usersStorage[this.usersStorage.length -1];
    console.log(this.usersStorage.length - 1)
    localStorage.setItem(`user_${user.login}`, JSON.stringify(user))
  };

  getUserStorage() { 
    return this.usersStorage
  }
}

