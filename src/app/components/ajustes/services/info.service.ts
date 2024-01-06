import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/enviroments.prod';
import { BehaviorSubject, Observable, catchError, lastValueFrom } from 'rxjs';
import { Informacion, ResultInfo } from '../interfaces/InfoInterfaces';
import { SnackbarService } from 'src/app//components/service/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private http = inject(HttpClient)
  private snack = inject(SnackbarService)

  datosTablas = new BehaviorSubject<Informacion[]>([])
  datosTablas$ = this.datosTablas.asObservable()

  url = environment.API_URL

  constructor() { }

  getMethod() {
    const obs$ = this.http.get<ResultInfo>(`${this.url}/api/gsoft/portal/payments/methods/`)
    lastValueFrom(obs$)
      .then((result) => {
        this.datosTablas.next(result.results)
      }).catch((err) => {

      });
  }

  postMethod(body: any) {
    const obs$ = this.http.post(`${this.url}/api/gsoft/portal/payments/methods/`, body)
    return lastValueFrom(obs$)
  }
  patchMethodId(body: any, id: number) {
    const obs$ = this.http.patch(`${this.url}/api/gsoft/portal/payments/methods/${id}/`, body)
    return lastValueFrom(obs$)
  }

  postMethod2(body: any) {
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    const obs$ = this.http.post(`${this.url}/api/gsoft/portal/payments/methods/`, body, { headers })
    lastValueFrom(obs$).then((value) => {
      console.log(value)
    }).catch((error) => {
      console.log(error)
    });
   
  }

  deleteMethod(id: any) {
    const obs$ = this.http.delete(`${this.url}/api/gsoft/portal/payments/methods/${id}/`)
    lastValueFrom(obs$)
      .then((result) => {
        this.snack.openSnack('Eliminado con exito', 'success')
        this.getMethod()
      }).catch((err) => {
        this.snack.openSnack('Error al eliminar', 'error')
      });
  }
}
function errorHandler(error: any, HttpErrorResponse: any) {
  throw new Error('Function not implemented.');
}

