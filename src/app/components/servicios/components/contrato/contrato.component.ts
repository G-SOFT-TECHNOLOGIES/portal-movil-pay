import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { LoadingService } from 'src/app/components/service/loading.service';
import { ServicesTV } from '../../interface/servicestv.interface';
import { ServicoTvService } from '../../services/servico-tv.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent {
  private router = inject(Router)
  private tvservices = inject(ServicoTvService)
  private loader = inject(LoadingService)
  suscrito: boolean = false
  private rout = inject(ActivatedRoute)
  sub !: Subscription
  id: number = 0
  contrato!: ContratoID
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });

  }
  ngOnInit(): void {
    console.log(this.id, 'el id')
    this.tvservices.getContratoTV(this.id).then((result) => {
      this.loader.hideLoading()
      result.contract_detail.map((contract) => {
        console.log(contract.service_type.id)
        if (contract.service_type.id == 4) {
          this.suscrito = true
        }
       return this.contrato = result
      })
      localStorage.setItem('contrato', JSON.stringify(this.id))
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoading()

    })
  }

}
