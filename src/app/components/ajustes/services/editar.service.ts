import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ResultClients } from '../interfaces/EditarInterfaces';
import { CoreService } from '../../service/core.service';
import { environment } from 'src/environments/enviroments.prod';

@Injectable({
  providedIn: 'root'
})
export class EditarService {
  private http = inject(HttpClient)
  private core = inject(CoreService)

  user = this.core.getUser()
  url = environment.API_URL

  constructor() { }

  getCuenta():Promise<ResultClients>{
    const obs$ = this.http.get<ResultClients>(`${this.url}/api/gsoft/portal/clients/`)
    return lastValueFrom(obs$)
  }
  EditarCuenta(body:any){
    const obs$ = this.http.patch(`${this.url}/api/gsoft/portal/clients/${this.user.id}/`,body)
    return lastValueFrom(obs$)
  }

}
