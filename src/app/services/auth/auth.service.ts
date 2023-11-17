import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private usersStorage: IUser[] = [];   
  private loginError = {error: 'Логин не совпадает'};
  
  constructor(private localStorageService: LocalStorageService) { } 

  checkUser(user: IUser):  {error: boolean | string} { 
    // ожидаем {error : false} и авторизуем юзера
    const userInUsersStorage: IUser | undefined = this.usersStorage.find((el) => el.login === user.login)
    const userInLocalStorage: IUser | null = this.localStorageService.getUser(user)
    
    if(userInLocalStorage) {
      return userInLocalStorage.psw === user.psw ? {error: false} : {error: 'Пароли не совпадают'};
    } else if (!userInLocalStorage) {
      return this.loginError;
    };
 
    if(!userInUsersStorage && userInLocalStorage) {
      const useStorage = userInLocalStorage as IUser;
      if (useStorage.login === user.login) {
        return useStorage.psw == user.psw  ? {error: false} : {error: 'Пароли не совпадают'}
      } else {
        return this.loginError;
      } 
    };
    return {error : 'Ошибка'};
  };

  setUserToUsersStorage(user: IUser): void {
    if(!this.usersStorage.find(el => el.login === user.login) && user?.login) {
      this.usersStorage.push(user)
    };
  };

  setUserToLocalStorage(user: IUser): void {
    this.localStorageService.setUser(user)
  };
  
  checkUserInLocalStorage(user: IUser): boolean {
    return !!this.localStorageService.getUser(user)
  };

  deleteUserFromLocalStorage(user: IUser): void {
    this.localStorageService.deleteUser(user)
  };

  deleteUser(user: IUser): void {
    this.localStorageService.deleteUser(user);
    if (Array.isArray(this.usersStorage)) {
      this.usersStorage =  this.usersStorage.filter((el) => el.login !== user.login);
    };
  };

  updateUserPassword(user: IUser, psw: string): void {
    user.psw = psw
    this.localStorageService.setUser(user)
  };
};



