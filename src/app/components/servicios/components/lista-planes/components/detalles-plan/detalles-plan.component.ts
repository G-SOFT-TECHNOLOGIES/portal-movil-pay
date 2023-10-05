import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingComponent } from 'src/app/components/home/loading/loading.component';
import { LoadingService } from 'src/app/components/service/loading.service';
import { PlanID } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-detalles-plan',
  templateUrl: './detalles-plan.component.html',
  styleUrls: ['./detalles-plan.component.css']
})
export class DetallesPlanComponent {
  private tvservices = inject(ServicoTvService)
  private router = inject(Router)
  private rout = inject(ActivatedRoute)
  private loader = inject(LoadingService)

  @Output() response = new EventEmitter<boolean>()
  sub !: Subscription
  id!: number
  infor !: PlanID;
  channels_plan_gtv: any[] = []
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
  ngOnInit(): void {
    this.loader.showLoading()
    this.tvservices.getTypesServicesTVId(this.id).then((result) => {
      this.infor = result
      result.channels_plan_gtv.map((data) => {
        this.channels_plan_gtv.push(data)
      })
      this.loader.hideLoading()
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoading()

    })
  }
  comprar() {
    this.response.emit(true)
    this.router.navigate(['home/servicios_tv/planes/detalles', this.id]);
    this.tvservices.setPlan(this.infor)
    return
  }


}
