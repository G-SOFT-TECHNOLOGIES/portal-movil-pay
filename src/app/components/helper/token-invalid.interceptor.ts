import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable,catchError, throwError } from 'rxjs';
import { LoginService } from '../auth/services/login.service';

@Injectable()
export class TokenInvalidInterceptor implements HttpInterceptor {

  constructor(private auth : LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401].includes(err.status)) {
          this.auth.logout()
        }
        const error = err.error?.message || err.statusText;
        // this.loading.hideLoading()
        return throwError(() => error);
      })
    );
  }
}
