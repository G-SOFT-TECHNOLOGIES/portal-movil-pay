import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroments.prod';
import { Graficos } from '../interface/graficos.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient)
  url = environment.API_URL

  constructor() { }

  getTrafickContract(body: any): Promise<Graficos[]> {
    const obs$ = this.http.get<Graficos[]>(
      `${this.url}/api/gsoft/portal/contracts/trafic/?contract_id=${body.id}&since=${body.since}&until=${body.until}`
    );
    return lastValueFrom(obs$);
  }
}
