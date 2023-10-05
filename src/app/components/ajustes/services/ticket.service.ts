import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/enviroments.prod';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Informacion, ResultInfo } from '../interfaces/InfoInterfaces';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ResultDetalleTicket, ResultTicket, Ticket, TimeLine } from '../interfaces/TicketInterfaces';
import { CoreService } from '../../service/core.service';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient)
  private snack = inject(SnackbarService)
  private core = inject(CoreService);

  datosTablas = new BehaviorSubject<Ticket[]>([])
  datosTablasTickets$ = this.datosTablas.asObservable()
  user = this.core.getUser();

  url = environment.API_URL
  constructor() { }

  getTickets() {
    const obs$ = this.http.get<ResultTicket>(`${this.url}/api/gsoft/portal/tickets/`)
    lastValueFrom(obs$)
      .then((result) => {
        this.datosTablas.next(result.results)
      }).catch((err) => {

      });
  }

  getDetalleTicket(id: number) {
    const obs$ = this.http.get<ResultDetalleTicket>(`${this.url}/api/gsoft/portal/tickets/${id}`)
    return lastValueFrom(obs$)
  }

  getIssues(id: number) {
    const obs$ = this.http.get<any>(`${this.url}/api/gsoft/portal/departments/issues/?department_id=${id}`)
    return lastValueFrom(obs$)
  }

  postMethod(body: any) {
    const obs$ = this.http.post(`${this.url}/api/gsoft/portal/tickets/`, body)
    return lastValueFrom(obs$)
  }

  getTicketTimeLine(id: number): Promise<TimeLine> {
    const obs$ = this.http.get<TimeLine>(`${this.url}/api/gsoft/portal/tickets/${id}/time_line/`);
    return lastValueFrom(obs$)
  }
}
