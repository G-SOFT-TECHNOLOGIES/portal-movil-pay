import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/components/service/loading.service';
import { ServicesTV } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { DialogDetallePlanComponent } from '../dialog-detalle-plan/dialog-detalle-plan.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-gtv',
  templateUrl: './home-gtv.component.html',
  styleUrls: ['./home-gtv.component.css']
})
export class HomeGtvComponent {
  private router = inject(Router)
  private tvservices = inject(ServicoTvService)
  private loader = inject(LoadingService)
  private rout = inject(ActivatedRoute)
  private dialog = inject(MatDialog)
  subscrito: boolean = false
  planesTv: ServicesTV[] = [];
  sub !: Subscription
  id: number = 0
  constructor() {
    this.id = this.tvservices.id_contrato.value;
  }
  ngOnInit(): void {
    if (this.id == 0) {
      this.tvservices.deleteItems()
      this.router.navigate(['home/contratos'])
     }
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

  adquirir(plan:any){
    this.tvservices.setPlan(plan)
    this.router.navigate(['home/gtv/subscribete', plan.id]);
  }
  IrDetalles(plan: any) {
    const dialogo = this.dialog.open(DialogDetallePlanComponent, {
      data: plan,
      width: window.innerWidth > 632 ?  '60%' : 'auto',
      height: window.innerWidth > 632 ?  'auto' : 'auto'
    })
  }
}
