import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/components/service/loading.service';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { ServicesTV } from 'src/app/components/servicios/interface/servicestv.interface';

@Component({
    selector: 'app-plubicidad',
    templateUrl: './plubicidad.component.html',
    styleUrls: ['./plubicidad.component.css']
})
export class PlubicidadComponent {
    products: any[] = [];
    private router = inject(Router)
    private tvservices = inject(ServicoTvService)
    private loader = inject(LoadingService)
    private rout = inject(ActivatedRoute)
    responsiveOptions!: any[];
    planesTv: ServicesTV[] = [];

    constructor(private dashboard: DashboardService) { }

    ngOnInit() {
        this.getPlanTv()
    }
    getPlanTv() {
        this.tvservices.getTypesServicesTV(4).then((result) => {
            this.loader.hideLoading()
            this.planesTv = result
        }).catch((err) => {
            console.log(err)
            this.loader.hideLoading()

            this.planesTv = []
        })
    }
    IrContrato(item: any) {
        this.tvservices.id_servicestv$.next(item.id)
        this.router.navigate(['home/contratos/'])
    }
}
