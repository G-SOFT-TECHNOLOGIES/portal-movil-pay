import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/enviroments.prod';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {
  private Http =inject(HttpClient)
  url= environment.API_URL

  constructor() { }

  validatePass(password:string){
    const obs$ = this.Http.post(`${this.url}/api/gsoft/portal/clients/validate_password/`,{
      password
    })
    return lastValueFrom(obs$)
  }

  setPassword(password:any){
    const obs$ = this.Http.post(`${this.url}/api/gsoft/portal/clients/set_password/`,{
      password:password,
      password2:password
    })
    return lastValueFrom(obs$)
  }
  

}
