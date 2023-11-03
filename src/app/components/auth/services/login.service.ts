import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { ResultsLogin } from '../interfaces/LoginInterfaces';
import { environment } from 'src/environments/enviroments.prod';
import { LoadingService } from '../../home/services/loading.service';
import { SnackbarService } from '../../service/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  status: boolean = this.token
  private isLoggedSub = new BehaviorSubject<boolean>(this.status)
  private snack = inject(SnackbarService)
  isLoggedSub$ = this.isLoggedSub.asObservable()
  url = environment.API_URL
  constructor(private http: HttpClient, private router: Router, private loading: LoadingService) { }


  async login(value: any) {
    this.loading.showLoading()
    const obs$ = this.http.post<ResultsLogin>(`${this.url}/portal/login/`, value)
    await firstValueFrom(obs$)
      .then((result) => {
        this.loading.hideLoading()
        sessionStorage.setItem('user', JSON.stringify(result.client))
        sessionStorage.setItem('token', result.token)
        this.snack.openSnack(result.message, 'success')
        this.isLoggedSub.next(true)
        this.router.navigate(['home'])
      }).catch((err) => {
        this.loading.hideLoading()
        console.log(err)
        if (err == 'Unknown Error' || err == 'Not Found' || err == 'Internal Server Error') {
          return this.snack.openSnack("Por  favor comuníquese con el administrador.", 'error')
        }
        return this.snack.openSnack(err, 'error')

      });
  }


  setLoggin() {
    this.isLoggedSub.next(false)
  }

  async logout() {
    sessionStorage.clear()
    location.href = '/'
    this.isLoggedSub.next(false)
  }

  get token(): boolean {
    return !!sessionStorage.getItem('token')
  }
  getSessionToken(): string {
    return sessionStorage.getItem('token') ?? ''
  }

  recuperarPass(ide: any) {
    const obs$ = this.http.post(`${this.url}/portal/forgot_password/`, {
      identification: ide,
      phone: false,
      email: true
    })
    return lastValueFrom(obs$)
  }



}
