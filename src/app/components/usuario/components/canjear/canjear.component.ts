import { Component, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { Contract, ParamsCampaing } from '../../interfaces/contractosInterfaces';
import { UsuarioService } from '../../services/usuario.service';
import { Campaign } from '../../interfaces/cupones.interfaces';
import { LoadingService } from 'src/app/components/home/services/loading.service';

@Component({
  selector: 'app-canjear',
  templateUrl: './canjear.component.html',
  styleUrls: ['./canjear.component.css']
})
export class CanjearComponent {
  private rout = inject(ActivatedRoute)
  private usuario = inject(FacturaContratoService)
  private usuario2 = inject(UsuarioService)
  private loader = inject(LoadingService)

  sub !: Subscription
  id: number = 0
  checked: boolean = false
  contrato = new BehaviorSubject<Contract | false>(false)
  campaing = new BehaviorSubject<Campaign[] | false>(false)
  page: number = 1
  shopping$ = this.usuario2.itemsCount
  canjear: boolean = false
  visible: boolean = false;
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
    this.usuario2.deleteAllItems()
  }
  ngOnInit(): void {
    this.loader.showLoading()
    this.usuario.getContrato(this.id)
    this.usuario.contrato$.subscribe((data: any) => {
      this.loader.hideLoading()
      this.contrato.next(data)
    })
    this.getCampaign()
  }
  getCampaign() {
    const params: ParamsCampaing = new ParamsCampaing()
    params.page = this.page
    this.usuario2.getCampaign(params).then((result) => {
      this.campaing.next(result.results)
    }).catch((error) => {
      this.campaing.next(false)
    })
  }
  showDialog() {
    this.visible = true;
  }
}
