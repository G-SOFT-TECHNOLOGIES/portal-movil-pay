import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroments.prod';
import { LoadingService } from '../../service/loading.service';
import { SnackbarService } from '../../service/snackbar.service';
import { Contract, ParamsCampaing, ResultContract } from '../interfaces/contractosInterfaces';
import { CoreService } from '../../service/core.service';
import { MatDialog } from '@angular/material/dialog';
import { CampaignRoot } from '../interfaces/cupones.interfaces';
import { QueryParamsService } from '../../utils/query-params.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private queryservices = inject(QueryParamsService)
  private http = inject(HttpClient)
  private snack = inject(SnackbarService)
  private loading = inject(LoadingService)
  private core = inject(CoreService)
  url = environment.API_URL
  private contractos = new Subject<Contract[] | false>()
  contractos$ = this.contractos.asObservable()
  private campaings = new BehaviorSubject<any[]>(this.initCampaings)
  campaings$ = this.campaings.asObservable()
  user = this.core.getUser()
  totalCostCampaings: number = 0
  totalAcumulado = new BehaviorSubject<number>(0)
  totalAcumulado$ = this.totalAcumulado.asObservable()
  itemsCount = new BehaviorSubject<number>(0)
  mispuntos = new BehaviorSubject<number>(0)
  constructor() { }


  getContratos() {
    this.loading.showLoading()
    const obs$ = this.http.get<ResultContract>(`${this.url}/api/gsoft/portal/contracts/?client=${this.user.id}`)
    lastValueFrom(obs$)
      .then((result) => {
        this.loading.hideLoading()
        this.contractos.next(result.results)
      }).catch((err) => {
        this.loading.hideLoading()
        this.snack.openSnack(err.error.detail, 'error')
        this.contractos.next(false)
      });
  }
  getContratoId(): Promise<ResultContract> {
    const http = this.http.get<ResultContract>(`${this.url}/api/gsoft/portal/contracts/?client=${this.user.id}`)
    return lastValueFrom(http)
  }

  patchUsuario(body: any, id: any) {
    const http = this.http.patch(`${this.url}/api/gsoft/portal/contracts/${id}/`, body)
    return lastValueFrom(http)
  }
  getCampaign(params: ParamsCampaing): Promise<CampaignRoot> {
    const resparams = this.queryservices.buildQueryParams(params)
    const http = this.http.get<CampaignRoot>(`${this.url}/api/gsoft/portal/invoices/campaign/coupons/`, { params: resparams })
    return lastValueFrom(http)
  }

  // Paquetes
  get initCampaings() {
    const session = JSON.parse(sessionStorage.getItem('campaings') as never)
    if (session) {
      return session
    }
    return []
  }
  setCampaings(e: any) {
    this.campaings.next([...this.campaings.value, e])
    sessionStorage.setItem('campaings', JSON.stringify([...this.campaings.value]))
  }
  deleteCampaings(e: any) {
    const data = this.campaings.value.filter((d: any) => d.id !== e.id)
    this.campaings.next(data as never)
    sessionStorage.setItem('campaings', JSON.stringify(data as never))
  }

  getCampaings() {
    this.campaings$.subscribe(data => {
      if (data.length > 0) {
        data.reduce((previousValue, array) => {
          return this.totalCostCampaings = Number(previousValue) + Number(array.pts)
        }, 0)

      } else {
        this.totalCostCampaings = 0
      }
    })
    return this.campaings.value
  }
  getTotalAcumm() {
    this.itemsCount.next(this.campaings.value.length)
    this.totalAcumulado.next(this.totalCostCampaings)
    return
  }
  deleteAllItems() {
    sessionStorage.removeItem('campaings')
    this.campaings.next(this.initCampaings)
    this.totalCostCampaings = 0
    this.itemsCount.next(0)
    this.totalAcumulado.next(0)
  }
  setGenerateCuopon(body:any){
    const http = this.http.post(`${this.url}/portal/invoices/coupons/adquire/`, body)
    return lastValueFrom(http)
  }
  
}
