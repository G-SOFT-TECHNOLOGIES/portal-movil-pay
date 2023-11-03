import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroments.prod';
import { PlanID, ServicesTV } from '../interface/servicestv.interface';
import { Packages, PackegeID } from '../interface/paquetes.interface';
import { ConstantPool } from '@angular/compiler';
import { ContratoID } from '../../finanzas/interfaces/UsuarioIDInterface';
import { GtvRoot } from '../interface/gtv.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicoTvService {
  private http = inject(HttpClient)
  url = environment.API_URL
  private paquetes = new BehaviorSubject<any[]>(this.initPaquete)
  paquetes$ = this.paquetes.asObservable()
  private plan = new BehaviorSubject<any[]>(this.initPlan)
  plan$ = this.plan.asObservable()
  private equipo = new BehaviorSubject<any[]>(this.initEquipo)
  equipo$ = this.equipo.asObservable()
  totalCostPlan: number = 0
  totalCostPaquetes: number = 0
  totalCostEquipo: number = 0
  totalItemsEquipo: number = 0
  totalAcumulado = new BehaviorSubject<number>(0)
  totalAcumulado$ = this.totalAcumulado.asObservable()
  id_contrato = new BehaviorSubject<number | any>(this.initIdContrato)
  id_contrato$ = this.id_contrato.asObservable()
  itemsCount = new BehaviorSubject<number>(0)
  totalTvBox$ = new BehaviorSubject<number>(this.totalCostEquipo)
  pagoTvBox$ = new BehaviorSubject<any>(null)
  datos_cuentas$ = new BehaviorSubject<any>({ "username": "", "password": "", "pin_code": "" })
  id_servicestv$ = new BehaviorSubject<number>(0)

  constructor() { }
  setPagoTvBox(body: any) {
    this.pagoTvBox$.next(body)
  }
  setIdServicesTv(id: any) {
    this.id_servicestv$.next(id)
  }
  //ID del contrato
  get initIdContrato() {
    const session = JSON.parse(sessionStorage.getItem('contrato') as never)
    if (session) {
      return session
    }
    return []
  }
  setIdContrato(id: number | string){
    let id_cont = id.toString()
    console.log(id_cont, 'serv')
    this.id_contrato.next(id_cont.toString())
    sessionStorage.setItem('paquetes', JSON.stringify(this.id_contrato.value))
    // if (isNaN(Number(this.id_contrato.value))) {
    //   this.id_contrato.next(id)
    //   console.log(this.id_contrato.value, 'el mismo')
    //   sessionStorage.setItem('contrato', JSON.stringify(this.id_contrato.value))
    //   return
    // }
    // console.log(id_cont, 'id_cont')
    // this.id_contrato.next(id)
    // console.log(this.id_contrato.value, 'valor')
    // sessionStorage.setItem('contrato', JSON.stringify(this.id_contrato.value))
    // return this
    // if (Number(this.id_contrato.value) !== id) {
    //   console.log(id, "id difer")

    // } else {

    // }
  }
  getIdContract() {
    this.id_contrato$.subscribe(data => {
      return this.id_contrato = data
    })
    return this.id_contrato.value
  }
  deleteIdContrato() {
    sessionStorage.removeItem('contrato')
  }
  // Paquetes
  get initPaquete() {
    const session = JSON.parse(sessionStorage.getItem('paquetes') as never)
    if (session) {
      return session
    }
    return []
  }
  setPaquetes(e: any) {
    this.paquetes.next([...this.paquetes.value, e])
    sessionStorage.setItem('paquetes', JSON.stringify([...this.paquetes.value]))
  }
  deletePaquetes(e: any) {
    const data = this.paquetes.value.filter((d: any) => d.id !== e.id)
    this.paquetes.next(data as never)
    sessionStorage.setItem('paquetes', JSON.stringify(data as never))
  }
  getPaquetes() {
    this.paquetes$.subscribe(data => {
      if (data.length > 0) {
        data.reduce((previousValue, array) => {
          return this.totalCostPaquetes = Number(previousValue) + Number(array.price)
        }, 0)

      } else {
        this.totalCostPaquetes = 0
      }
    })
    this.getTotalItems()
    return this.paquetes.value
  }
  // Plan
  get initPlan() {
    const session = JSON.parse(sessionStorage.getItem('plan') as never)
    if (session) {
      return session
    }
    return []
  }
  setPlan(e: any) {
    this.plan.next([e])
    sessionStorage.setItem('plan', JSON.stringify([...this.plan.value]))
  }
  deletePlan(e: any) {
    const data = this.plan.value.filter((d: any) => d.key !== e.key)
    this.plan.next(data as never)
    sessionStorage.setItem('plan', JSON.stringify(data as never))
  }
  getPlan() {
    this.plan$.subscribe(data => {
      if (data.length > 0) {
        data.reduce((previousValue, array) => {
          return this.totalCostPlan = Number(previousValue) + Number(array.cost)
        }, 0)

      } else {
        this.totalCostPlan = 0
      }
    })
    return this.plan.value
  }
  // Equipo
  get initEquipo() {
    const session = JSON.parse(sessionStorage.getItem('equipo') as never)
    if (session) {
      return session
    }
    return []
  }
  setEquipo(e: any) {
    this.equipo.next([e])
    sessionStorage.setItem('equipo', JSON.stringify(this.equipo.value))
  }
  deleteEquipo(e: any) {
    const data = this.equipo.value.pop()
    sessionStorage.setItem('equipo', JSON.stringify(this.equipo.value))
  }
  deleteItemEquipo(e: any) {
    sessionStorage.removeItem('equipo')
    this.totalCostEquipo = 0
    this.getTotalAcumm()
  }
  getEquipo() {
    this.equipo$.subscribe(data => {
      if (data.length > 0) {
        data.map((item) => {
          this.totalItemsEquipo = Number(item.count)
          this.totalCostEquipo = Number(item.cost * item.count)
          return
        })
      } else {
        this.totalCostEquipo = 0
      }
    })
    this.totalTvBox$.next(this.totalCostEquipo)
    return this.equipo.value
  }
  getTotalAcumm() {
    return this.totalAcumulado.next(this.totalCostPaquetes + this.totalCostPlan)
  }
  getTotalItems() {
    return this.itemsCount.next(this.paquetes.value.length + this.totalItemsEquipo)
  }
  deleteItems() {
    sessionStorage.removeItem('paquetes')
    sessionStorage.removeItem('plan')
    sessionStorage.removeItem('equipo')
    this.totalCostEquipo = 0
    this.totalCostPaquetes = 0
    this.totalCostPlan = 0
    this.pagoTvBox$.next(0)
    this.totalTvBox$.next(0)
    this.totalAcumulado.next(0)
    this.deleteIdContrato()
  }
  getTypesServicesTV(services: number): Promise<ServicesTV[]> {
    const resp = this.http.get<ServicesTV[]>(`${this.url}/api/gsoft/portal/services/type/`)
    return lastValueFrom(resp)
  }
  getTypesServicesTVId(id: number): Promise<PlanID> {
    const resp = this.http.get<PlanID>(`${this.url}/api/gsoft/portal/services/type/${id}/`)
    return lastValueFrom(resp)
  }
  getAllPackages(): Promise<Packages[]> {
    const resp = this.http.get<Packages[]>(`${this.url}/api/gsoft/portal/gtv/package/`)
    return lastValueFrom(resp)
  }
  getPackages(id: number): Promise<PackegeID[]> {
    const resp = this.http.get<PackegeID[]>(`${this.url}/api/gsoft/portal/gtv/channels_package/?package=${id}`)
    return lastValueFrom(resp)
  }
  getTvBox() {
    const resp = this.http.get<PackegeID[]>(`${this.url}/api/gsoft/portal/services/products/`)
    return lastValueFrom(resp)
  }
  addServiceTV(body: any) {
    const resp = this.http.post(`${this.url}/api/gsoft/portal/gtv/add_service_tv/`, body)
    return lastValueFrom(resp)
  }
  getContratoTV(id: string | number) {
    const obs$ = this.http.get<ContratoID>(`${this.url}/api/gsoft/portal/contracts/${id}/`)
    return lastValueFrom(obs$)

  }
  setValoresCuenta(body: any) {
    this.datos_cuentas$.next(body)
  }
  getDetailGtv(id: string | number) {

    const obs$ = this.http.get<GtvRoot>(`${this.url}/api/gsoft/portal/gtv/account/${id}/info/`)
    return lastValueFrom(obs$)
  }
  updateAccountTv(body: any, id: number) {
    const obs$ = this.http.put(`${this.url}/api/gsoft/portal/gtv/account/${id}/`, body)
    return lastValueFrom(obs$)
  }
  unlinkAccount(body: any,) {
    const obs$ = this.http.post(`${this.url}/api/gsoft/portal/gtv/delete_device/`, body)
    return lastValueFrom(obs$)
  }
  addServiceTVId(body: any, id: number) {
    const resp = this.http.post(`${this.url}/api/gsoft/portal/gtv/account/${id}/package/`, body)
    return lastValueFrom(resp)
  }
}
