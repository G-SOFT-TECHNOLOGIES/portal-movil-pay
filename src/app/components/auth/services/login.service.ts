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
    const obs$ = this.http.get<any>(`${this.url}/api/gsoft/portal/services/alerts/`)
    lastValueFrom(obs$)
      .then((result) => {
        localStorage.setItem('alerts', JSON.stringify(result as never))
        this.arr_alerts.next(result.length > 0 ? result : [])
        localStorage.setItem('view_alerts', JSON.stringify(result.length > 0))
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

        // this.getDataAjustes
        // this.getDataInicio
        // this.getDataContratos
        // this.getDataTickets
        // this.getDataCanjes

      }).catch((err) => {
        // if (err.status == 500) {
        //   this.isLoggedSub.next(true)
        //   this.router.navigate(['home'])
        // }
        console.log(err)
      });
  }

  get getDataAjustes() {
    const session: Alerts[] = JSON.parse(localStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'ajustes') {
          this.ajustes.push(menu)
        }
      })
      this.ajustes$.next(this.ajustes)
      return this.ajustes$.value
    }
    return []
    // this.ajustes?.reduce((previousValue, array) => {
    //   return this.ajustes = previousValue
    // }, [])
    // return this.ajustes$.value
  }
  get getDataContratos() {
    const session: Alerts[] = JSON.parse(localStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'contratos') {
          this.contratos.push(menu)
        }
      })
      this.contratos$.next(this.contratos)
      return this.contratos$.value
    }
    return []
  }
  get getDataInicio() {
    const session: Alerts[] = JSON.parse(localStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'inicio') {
          this.inicio.push(menu)
        }
      })
      this.inicio$.next(this.inicio)
      return this.inicio$.value
    }
    return []
  }
  get getDataTickets() {
    const session: Alerts[] = JSON.parse(localStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'tickets') {
          this.tickets.push(menu)
        }
      })
      this.tickets$.next(this.tickets)
      return this.tickets$.value
    }
    return []
  }
  get getDataCanjes() {
    const session: Alerts[] = JSON.parse(localStorage.getItem('alerts') as never)
    if (session) {
      session?.map((menu) => {
        if (menu.menu_patch == 'canjes') {
          this.canjes.push(menu)
        }
      })
      this.canjes$.next(this.canjes)
      return this.canjes$.value
    }
    return []
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
