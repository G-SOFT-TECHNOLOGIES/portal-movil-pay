import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(private auth:LoginService,private router:Router){}
  canActivate(): Observable<true|UrlTree> {
    return this.isLoggind()
  }

  isLoggind(){
    return this.auth.isLoggedSub$.pipe(
      map((login:boolean)=>login|| this.router.parseUrl('auth/login'))
    );
  }
  
}
