import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroments.prod';
import { ConsumoParams, IConsumo } from '../interface/graficos.interface';
import { QueryParamsUtils } from '../../utils/params.utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient)
  url = environment.API_URL

  constructor() { }

  getTrafickContract(id:number, queryParams: ConsumoParams): Promise<IConsumo[]> {
    const params = QueryParamsUtils.buildParamsFromObject(queryParams);
    const obs$ = this.http.get<IConsumo[]>(`${this.url}/api/gsoft/portal/contracts/traffic/${id}/`, { params });
    return lastValueFrom(obs$);
  }
}
