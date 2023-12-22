import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements HttpInterceptor{
  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const hasToken = this.userService.getToken();
    // const hasToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InlvdSIsInBzdyI6IjEiLCJpYXQiOjE3MDEyODYyNjZ9.QBK5h-EWAmQCHjwKGgzU6ShuJtmVa1ZmKGD1WKeOAfc"
   
    
    if(hasToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + hasToken)
      });
      return next.handle(cloned) 
    } else {
      return next.handle(req)
    }
  };
};
