import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/enviroments.prod';
import {lastValueFrom } from 'rxjs';
import { RootCanjes } from '../models/canjesInterface';

@Injectable({
  providedIn: 'root'
})
export class CanjesService {
  url = environment.API_URL
  private http = inject(HttpClient)

  constructor() { }

  getCanjes(params:any) {
    const obs$ = this.http.get<RootCanjes>(`${this.url}/api/gsoft/portal/invoices/coupons/`,{params})
    return lastValueFrom(obs$)
  }
}
