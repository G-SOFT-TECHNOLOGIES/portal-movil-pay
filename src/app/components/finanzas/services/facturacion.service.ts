import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  metodos = new BehaviorSubject<any>([])
  amount = new BehaviorSubject<number>(0);

  constructor() { }


  pagar(pago:any){ 
      //this.metodos.next([...this.metodos.value, pago]);

      
  }

  calcular(){
    const pagos = this.metodos.value.map(
      (element: any) => element.payment_invoices[0].amount
    );
    const suma = pagos.reduce(
      (acumulador: any, valorActual: any) => acumulador + valorActual,
      0
    );
    this.amount.next(suma);
  }
}
