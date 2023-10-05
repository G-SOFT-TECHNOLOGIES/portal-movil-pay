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

  getTrafickContract(body: any):Promise<Graficos[]> {
    const obs$ = this.http.get<Graficos[]>(
      `${this.url}/api/gsoft/portal/contracts/trafic/?contract_id=${body.id}&since=${body.since}&until=${body.until}`
    );
    return lastValueFrom(obs$);
  }
  getProductsData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Plan Bronce',
        description: 'Product Description',
        image: 'B_Geeze.png',
        price: 40.60,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Plan Plata',
        description: 'Product Description',
        image: 'P_Geeze.png',
        price: 52.20,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Plan Oro',
        description: 'Product Description',
        image: 'O_Geeze.png',
        price: 58.00,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Plan Diamante',
        description: 'Product Description',
        image: 'D_Geeze.png',
        price: 81.20,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },

      // {
      //   id: '1000',
      //   code: 'f230fh0g3',
      //   name: 'G-Network',
      //   description: 'Product Description',
      //   image: 'g1.png',
      //   price: 0,
      //   category: 'Accessories',
      //   quantity: 24,
      //   inventoryStatus: 'INSTOCK',
      //   rating: 5
      // },
      // {
      //   id: '1000',
      //   code: 'f230fh0g3',
      //   name: 'Fondo',
      //   description: 'Product Description',
      //   image: 'fondo1.jpg',
      //   price: 0,
      //   category: 'Accessories',
      //   quantity: 24,
      //   inventoryStatus: 'INSTOCK',
      //   rating: 5
      // },
      // {
      //   id: '1000',
      //   code: 'f230fh0g3',
      //   name: 'G Network',
      //   description: 'Product Description',
      //   image: 'g11.png',
      //   price: 0,
      //   category: 'Accessories',
      //   quantity: 24,
      //   inventoryStatus: 'INSTOCK',
      //   rating: 5
      // },
    ];
  }
  getProductsSmall() {
    return Promise.resolve(this.getProductsData().slice(0, 10));
  }



}
