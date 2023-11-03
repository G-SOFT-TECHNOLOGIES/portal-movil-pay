import { Component, inject } from '@angular/core';
import { ServicoTvService } from '../../services/servico-tv.service';
import { LoadingService } from 'src/app/components/service/loading.service';
import { ServicesTV } from '../../interface/servicestv.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
;

@Component({
  selector: 'app-nueva-suscripcion',
  templateUrl: './nueva-suscripcion.component.html',
  styleUrls: ['./nueva-suscripcion.component.css']
})
export class NuevaSuscripcionComponent {
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
    // this.tvservices.setIdContrato(this.id)
    // if (this.tvservices.id_contrato.value != this.id) {
    // }
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
    this.router.navigate(['home/servicios_tv/planes/informacion', plan])
  }
}
