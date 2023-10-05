import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/services/login.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private auth: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token')
    let req = request
    if (token) {
      req = request.clone({
        headers:request.headers.set('Authorization',`Token ${token}`)
      })
    }
    return next.handle(req);
  }
  
}
