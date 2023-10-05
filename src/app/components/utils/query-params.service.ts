import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  buildQueryParams(params: any): HttpParams {
    let queryParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        queryParams = queryParams.set(key, params[key].toString());
      }
    });

    return queryParams;
  }
}
