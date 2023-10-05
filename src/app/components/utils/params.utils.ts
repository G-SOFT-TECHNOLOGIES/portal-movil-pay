import { HttpParams } from '@angular/common/http';

export class QueryParamsUtils {
  static buildParamsFromObject(obj: any): HttpParams {
    let params = new HttpParams();

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] != null && obj[key] != '') {
        params = params.set(key, obj[key]);
      }
    }

    return params;
  }
}