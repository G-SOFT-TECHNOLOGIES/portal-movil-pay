import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContratoID } from '../finanzas/interfaces/UsuarioIDInterface';
import { LoadingService } from '../service/loading.service';
import { ServicoTvService } from '../servicios/services/servico-tv.service';

@Component({
  selector: 'app-gtv',
  templateUrl: './gtv.component.html',
  styleUrls: ['./gtv.component.css']
})
export class GtvComponent {
  private tvservices = inject(ServicoTvService)
  private loader = inject(LoadingService)
  suscrito = new BehaviorSubject<boolean>(false)
  private rout = inject(ActivatedRoute)
  private router = inject(Router)
  sub !: Subscription
  id = new BehaviorSubject<number>(0)
  contrato!: ContratoID
  constructor() {
    this.id.next(this.tvservices.id_contrato.value);
  }
  ngOnInit(): void {
    this.loader.showLoading()
    this.id.value == 0 ? (this.router.navigate(['home/contratos']), this.tvservices.deleteItems(), this.loader.hideLoading()
    ) : (this.Option(this.id.value))

  }
  Option(id: number) {
    this.tvservices.getContratoTV(id).then((result: ContratoID) => {
      let res = result.contract_detail.filter((contract) => contract.service_type.id === 4).map((contract) => contract)
      console.log(res)
      this.loader.hideLoading();
      if (res.length > 0) {
        return this.router.navigate(['home/gtv/servicio', id])
      }
      return this.router.navigate(['home/gtv/planes'])
      // result.contract_detail.map((contract) => {
      // if (contract.service_type.id === 4) {
      //   console.log(contract?.service_type, 'service_type')
      //   this.suscrito.next(true)
      //   this.contrato = result
      //   return
      // }
      // })
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoading()

    })
  }
}
