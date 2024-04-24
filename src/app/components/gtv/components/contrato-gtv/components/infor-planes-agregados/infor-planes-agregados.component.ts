import { Component, Input, inject } from '@angular/core';
import { ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { LoadingService } from 'src/app/components/service/loading.service';
import { PlanID } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-infor-planes-agregados',
  templateUrl: './infor-planes-agregados.component.html',
  styleUrls: ['./infor-planes-agregados.component.css']
})
export class InforPlanesAgregadosComponent {

  @Input() canales!: PlanID
  channels_plan_gtv: any[] = []
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.canales.channels_plan_gtv.map((data) => {
      this.channels_plan_gtv.push(data)
    })
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
