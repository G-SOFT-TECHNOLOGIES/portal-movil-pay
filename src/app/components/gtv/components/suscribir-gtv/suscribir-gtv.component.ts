import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/components/service/loading.service';
import { ServicesTV } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-suscribir-gtv',
  templateUrl: './suscribir-gtv.component.html',
  styleUrls: ['./suscribir-gtv.component.css']
})
export class SuscribirGtvComponent {
  private router = inject(Router)
  private tvservices = inject(ServicoTvService)
  private loader = inject(LoadingService)
  private rout = inject(ActivatedRoute)
  shopping$ = this.tvservices.paquetes$
  subscrito: boolean = false
  sidebarVisible1: boolean = false
  lista_paquetes: any = []
  planesTv: ServicesTV[] = [];
  sub !: Subscription
  id: number = 0
  contrato2 = {}
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
  ngOnInit(): void {
    this.tvservices.deleteItems()
    this.getShopping()
  }
  getShopping() {
    this.loader.showLoading()
    this.tvservices.getTypesServicesTV(4).then((result) => {
      this.loader.hideLoading()
      this.planesTv = result
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoading()

      this.planesTv = []
    })
  }
  IrDetalles(plan: number) {
    this.router.navigate(['home/gtv/planes/informacion', plan])
  }
}
