import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroments.prod';
import { InvoiceParams, ResultsInvoice } from '../interfaces/UsuarioInterfaces';

import { ContratoID } from '../interfaces/UsuarioIDInterface';
import { CoreService } from '../../service/core.service';
import { QueryParamsService } from '../../utils/query-params.service';

export interface Dollar {
  fecha: string;
  monto: string;
  dollar_fail: boolean;
}



@Injectable({
  providedIn: 'root'
})
//ante era UsuarioServices
export class FacturaContratoService {
  private http = inject(HttpClient)
  private facturas = new Subject()
  private core = inject(CoreService)
  private queryservices = inject(QueryParamsService)

  facturas$ = this.facturas.asObservable()
  private contrato = new Subject<ContratoID | false>()
  contrato$ = this.contrato.asObservable()
  url = environment.API_URL
  fecha = this.core.Fecha()

  private montoDollar = new BehaviorSubject<number>(0)
  montoDollar$ = this.montoDollar.asObservable()


  saldoFavor: any = 0



  // getFacturas(id:string| number,page=0):Promise<ResultsInvoice>{
  //   let url = `${this.url}/api/gsoft/portal/invoices/?contract=${id}`
  //   if (page > 0) {
  //     url = `${this.url}/api/gsoft/portal/invoices/?contract=${id}&page=${page}`
  //   }
  //   const obs$ = this.http.get<ResultsInvoice>(url)
  //   return lastValueFrom(obs$)    
  // }
  getFacturas(params: InvoiceParams): Promise<ResultsInvoice> {
    const resparams = this.queryservices.buildQueryParams(params)
    let services = `${this.url}/api/gsoft/portal/invoices/`
    const http = this.http.get<ResultsInvoice>(services, { params: resparams })
    return lastValueFrom(http)

  }
  getContrato(id: string | number) {
    const obs$ = this.http.get<ContratoID>(`${this.url}/api/gsoft/portal/contracts/${id}/`)
    lastValueFrom(obs$)
      .then((result) => {
        this.contrato.next(result)
      }).catch((err) => {
        this.contrato.next(false)
      });
  }

  getDollar() {
    const obs$ = this.http.get<Dollar[]>(`${this.url}/api/gsoft/services/dollar/?fecha=${this.fecha}`)
    lastValueFrom(obs$)
      .then((result) => {
        const [data] = result
        this.montoDollar.next(Number(data.monto))
      }).catch((err) => {
      });
  }

  pagarFatura(body: any) {
    const obs$ = this.http.post(`${this.url}/api/gsoft/portal/payments/`, body)
    return lastValueFrom(obs$)
  }


  validarPago(body: any) {
    const obs$ = this.http.post<{ message: string; monto: number }>(
      `${this.url}/api/gsoft/payments/pmbd/validate/`,
      body
    );
    return lastValueFrom(obs$);
  }

  setContratos(contrato: false) {
    this.contrato.next(contrato)
  }


  validateCupon(body: any) {
    const obs$ = this.http.post<any>(
      `${this.url}/api/gsoft/invoices/coupon/validate/`,
      body,
    );
    return lastValueFrom(obs$);
  }
  patchDiscountInvoice(id: number, data: any) {
    const obs$ = this.http.patch(`${this.url}/api/gsoft/portal/invoices/${id}/`, data)
    return lastValueFrom(obs$)
  }

  calcularBs(montoBs: number | string) {
    return Number(montoBs) == 0 ? montoBs : Number(montoBs) * this.montoDollar.value
  }

}
