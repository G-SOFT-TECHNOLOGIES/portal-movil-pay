import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroments.prod';
import { LoadingService } from '../../service/loading.service';
import { SnackbarService } from '../../service/snackbar.service';
import { Contract, ResultContract } from '../interfaces/contractosInterfaces';
import { CoreService } from '../../service/core.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient)
  private snack = inject(SnackbarService)
  private loading = inject(LoadingService)
  private core = inject(CoreService)
  url = environment.API_URL
  private contractos = new Subject<Contract[] | false>()
  contractos$ = this.contractos.asObservable()

  user = this.core.getUser()

  constructor() { }


  getContratos() {
    this.loading.showLoading()
    const obs$ = this.http.get<ResultContract>(`${this.url}/api/gsoft/portal/contracts/?client=${this.user.id}`)
    lastValueFrom(obs$)
      .then((result) => {
        this.loading.hideLoading()
        this.contractos.next(result.results)
      }).catch((err) => {
        this.loading.hideLoading()
        this.snack.openSnack(err.error.detail, 'error')
        this.contractos.next(false)
      });
  }
  getContratoId(): Promise<ResultContract> {
    const http = this.http.get<ResultContract>(`${this.url}/api/gsoft/portal/contracts/?client=${this.user.id}`)
    return lastValueFrom(http)

  }

}
