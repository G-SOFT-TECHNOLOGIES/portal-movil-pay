import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  suscrito: boolean | null = null 
  private rout = inject(ActivatedRoute)
  sub !: Subscription
  id: number = 0
  contrato!: ContratoID
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
    
    this.loader.showLoading()
  }
  ngOnInit(): void {
    this.loader.hideLoading()
    this.tvservices.getContratoTV(this.id).then((result) => {
      result.contract_detail.map((contract) => {
        this.contrato = result
        if (contract.service_type.id == 4) {
          this.suscrito = true
          return
        }
        this.suscrito = false
       return 
      })
      this.tvservices.setIdContrato(this.id)
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoading()

    })
  }
}
