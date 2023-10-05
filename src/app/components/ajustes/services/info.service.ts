import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/enviroments.prod';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Informacion, ResultInfo } from '../interfaces/InfoInterfaces';
import { SnackbarService } from 'src/app//components/service/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private http = inject(HttpClient) 
  private snack = inject(SnackbarService) 

  datosTablas=new BehaviorSubject<Informacion[]>([])
  datosTablas$ = this.datosTablas.asObservable()

  url = environment.API_URL

  constructor() { }

  getMethod(){
    const obs$ = this.http.get<ResultInfo>(`${this.url}/api/gsoft/portal/payments/methods/`)
    lastValueFrom(obs$)
    .then((result) => {
      this.datosTablas.next(result.results)
    }).catch((err) => {
      
    });
  }

  postMethod(body:any){
    const obs$ = this.http.post(`${this.url}/api/gsoft/portal/payments/methods/`,body)
    return lastValueFrom(obs$)
  }

  deleteMethod(id:any){
    const obs$ = this.http.delete(`${this.url}/api/gsoft/portal/payments/methods/${id}/`)
    lastValueFrom(obs$)
    .then((result) => {
      this.snack.openSnack('Eliminado con exito','success')
      this.getMethod()
    }).catch((err) => {
      this.snack.openSnack('Error al eliminar','error')
    });
  }
}
