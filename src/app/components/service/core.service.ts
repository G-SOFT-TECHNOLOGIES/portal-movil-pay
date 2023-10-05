import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { lastValueFrom, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/enviroments.prod';
import { Client } from '../auth/interfaces/LoginInterfaces';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private http=inject(HttpClient) 
  url = environment.API_URL

  constructor() { }


  getUser():Client{
    const user = JSON.parse(sessionStorage.getItem('user')??'')
    return user
  }
  
  Fecha(): string {
    return new Date().toISOString().slice(0, 10);
  }
  formatearFecha(date:string = ''){
    const fecha = new Date(date);
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; 
    const dia = fecha.getDate();
    const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    return fechaFormateada
  }

}
