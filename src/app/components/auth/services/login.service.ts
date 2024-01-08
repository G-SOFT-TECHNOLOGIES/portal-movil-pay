import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, async, firstValueFrom, lastValueFrom } from 'rxjs';
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

  // private alerts = new BehaviorSubject<Alerts[] | []>(this.initAlerts)
  // alerts$ = this.alerts.asObservable()
  ajustes$ = new BehaviorSubject(this.ajustes)
  inicio$ = new BehaviorSubject(this.inicio)
  contratos$ = new BehaviorSubject(this.contratos)
  tickets$ = new BehaviorSubject(this.tickets)
  canjes$ = new BehaviorSubject(this.canjes)
  constructor(private http: HttpClient, private router: Router, private loading: LoadingService) { }

  async login(value: any) {
    this.loading.showLoading()
    const obs$ = this.http.post<ResultsLogin>(`${this.url}/portal/login/`, value)
    await firstValueFrom(obs$)
      .then((result) => {
        this.loading.hideLoading()
        sessionStorage.setItem('user', JSON.stringify(result.client))
        sessionStorage.setItem('token', result.token)
        this.snack.openSnack(result.message, '')
        this.isLoggedSub.next(true)
        this.router.navigate(['home'])
        this.getAlerts()
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
        const validate = JSON.parse(sessionStorage.getItem('view_alerts') as never)
        validate !=null ? sessionStorage.setItem('view_alerts', JSON.stringify(validate)) : sessionStorage.setItem('view_alerts', JSON.stringify(true))
        this.getDataAjustes
        this.getDataContratos
        this.getDataInicio
        this.getDataTickets
        this.getDataCanjes
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
  deleteAlertsAjuste(e: any) {
    console.log(e)
    const data = this.ajustes$.value.filter((d: any) => d.code !== e)
    sessionStorage.setItem('alerts', JSON.stringify(data))
    this.ajustes$.next(data)
  }
}
