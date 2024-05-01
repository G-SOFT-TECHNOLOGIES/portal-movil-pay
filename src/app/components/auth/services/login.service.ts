import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, async, firstValueFrom, lastValueFrom } from 'rxjs';
import { Alerts, ResultsLogin } from '../interfaces/LoginInterfaces';
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
  url = environment.API_URL;
  ajustes: Alerts[] = []
  inicio: Alerts[] = []
  contratos: Alerts[] = []
  tickets: Alerts[] = []
  canjes: Alerts[] = []
  ajustes$ = new BehaviorSubject(this.ajustes)
  inicio$ = new BehaviorSubject(this.inicio)
  contratos$ = new BehaviorSubject(this.contratos)
  tickets$ = new BehaviorSubject(this.tickets)
  canjes$ = new BehaviorSubject(this.canjes)
  msg_alerts = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('view_alerts') as never))
  arr_alerts = new BehaviorSubject<Alerts[]>([])
  arr_alerts$ = this.arr_alerts.asObservable()
  constructor(private http: HttpClient, private router: Router, private loading: LoadingService) { }

  login(value: any) {
    this.loading.showLoading()
    const obs$ = this.http.post<ResultsLogin>(`${this.url}/portal/login/`, value)
    firstValueFrom(obs$)
      .then((result) => {
        this.loading.hideLoading()
        localStorage.setItem('user', JSON.stringify(result.client))
        sessionStorage.setItem('token', result.token)
        this.snack.openSnack(result.message, '')
        this.router.navigate(['home'])
        this.loading.hideLoading()
        this.isLoggedSub.next(true)

        this.getAlerts()
      }).catch((err) => {
        this.loading.hideLoading()
        if (err.status == 400) {
          this.snack.openSnack(err.error?.message, 'error')
          return
        }
        this.snack.openSnack(err.error?.message, 'error')
        console.log(err)
        return
      });
  }
  setLoggin() {
    this.isLoggedSub.next(false)
  }
  async logout() {
    localStorage.clear();
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

  getAlerts() {
    // this.contratos$.next([{"code":"gtv_contrato","menu_patch":"contratos"}])
    const obs$ = this.http.get<any>(`${this.url}/api/gsoft/portal/services/alerts/`)
    lastValueFrom(obs$)
      .then((result) => {
        localStorage.setItem('alerts', JSON.stringify(result as never))
        const validate = JSON.parse(localStorage.getItem('view_alerts') as never)
        validate == null ? localStorage.setItem('view_alerts', JSON.stringify(result.length > 0)) : localStorage.setItem('view_alerts', JSON.stringify(validate))
        this.msg_alerts.next(result.length > 0)
        result?.filter((menu: Alerts) => {
          if (menu.menu_patch == 'ajustes') {
            this.ajustes.push(menu)
            this.ajustes$.next(this.ajustes)
          }
          if (menu.menu_patch == 'contratos') {
            this.contratos.push(menu)
            this.contratos$.next(this.contratos)
          }
          if (menu.menu_patch == 'tickets') {
            this.tickets.push(menu)
            this.tickets$.next(this.tickets)
          }
          if (menu.menu_patch == 'inicio') {
            this.inicio.push(menu)
            this.inicio$.next(this.inicio)
          }
          if (menu.menu_patch == 'canjes') {
            this.canjes.push(menu)
            this.canjes$.next(this.canjes)
          }
        })
      }).catch((err) => {
        console.log(err)
      });
  }
  updateAlerts(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/gsoft/portal/services/alerts/`, body)
    return lastValueFrom(obs$)
  }
  deleteAlerts(e: any) {
    const session: Alerts[] = JSON.parse(localStorage.getItem('alerts') as never)
    const storage = session.filter((d: any) => d.code !== e)
    localStorage.setItem('alerts', JSON.stringify([...storage]))
  }

}
