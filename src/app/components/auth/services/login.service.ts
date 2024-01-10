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
  msg_alerts = new BehaviorSubject<boolean>(JSON.parse(sessionStorage.getItem('view_alerts') as never))
  arr_alerts = new BehaviorSubject<Alerts[]>([])
  arr_alerts$ = this.arr_alerts.asObservable()
  constructor(private http: HttpClient, private router: Router, private loading: LoadingService) { }

   login(value: any) {
    this.loading.showLoading()
    const obs$ = this.http.post<ResultsLogin>(`${this.url}/portal/login/`, value)
     firstValueFrom(obs$)
      .then((result) => {
        this.loading.hideLoading()
        sessionStorage.setItem('user', JSON.stringify(result.client))
        sessionStorage.setItem('token', result.token)
        this.getAlerts()
        this.snack.openSnack(result.message, '')
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

  getAlerts() {
    const obs$ = this.http.get<any>(`${this.url}/api/gsoft/portal/services/alerts/`)
    lastValueFrom(obs$)
      .then((result) => {
        sessionStorage.setItem('alerts', JSON.stringify(result as never))
        this.arr_alerts.next(result.length > 0 ? result : [])
        const validate = JSON.parse(sessionStorage.getItem('view_alerts') as never)
        validate == null ? sessionStorage.setItem('view_alerts', JSON.stringify(result.length > 0)) : sessionStorage.setItem('view_alerts', JSON.stringify(validate))
        this.msg_alerts.next(validate)
      }).catch((err) => {
        console.log(err)
      });
  }

  get getDataAjustes() {
    const session: Alerts[] = JSON.parse(sessionStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'ajustes') {
          this.ajustes.push(menu)
        }
      })
      return this.ajustes
    }
    return []
    // this.ajustes?.reduce((previousValue, array) => {
    //   return this.ajustes = previousValue
    // }, [])
    // return this.ajustes$.value
  }
  get getDataContratos() {
    const session: Alerts[] = JSON.parse(sessionStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'contratos') {
          this.contratos.push(menu)
        }
      })
      return this.contratos
    }
    return []
  }
  get getDataInicio() {
    const session: Alerts[] = JSON.parse(sessionStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'inicio') {
          this.inicio.push(menu)
        }
      })
      return this.inicio
    }
    return []
  }
  get getDataTickets() {
    const session: Alerts[] = JSON.parse(sessionStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'tickets') {
          this.tickets.push(menu)
        }
      })
      return this.tickets
    }
    return []
  }
  get getDataCanjes() {
    const session: Alerts[] = JSON.parse(sessionStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'canjes') {
          this.canjes.push(menu)
        }
      })
      return this.canjes
    }
    return []
  }
  updateAlerts(body: any): Promise<any> {
    const obs$ = this.http.post<any>(`${this.url}/api/gsoft/portal/services/alerts/`, body)
    return lastValueFrom(obs$)
  }
  deleteAlerts(e: any) {
    const session: Alerts[] = JSON.parse(sessionStorage.getItem('alerts') as never)
    const storage = session.filter((d: any) => d.code !== e)
    sessionStorage.setItem('alerts', JSON.stringify([...storage]))
  }

}
