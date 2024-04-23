import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { Validate } from 'src/app/components/servicios/interface/pagos.interface';
import { Packages } from 'src/app/components/servicios/interface/paquetes.interface';
import { ServicesTV } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { ParamsGTV } from 'src/app/components/usuario/interfaces/contractosInterfaces';

@Component({
  selector: 'app-suscribir-gtv',
  templateUrl: './suscribir-gtv.component.html',
  styleUrls: ['./suscribir-gtv.component.css']
})
export class SuscribirGtvComponent {
  private services = inject(ServicoTvService)
  private loader = inject(LoadingService);
  private snack = inject(SnackbarService);
  private router = inject(Router)
  contrato: number = 0
  plan: any | null
  tvbox: any[] = []
  packages: Packages[] = []
  acumulado = this.services.totalAcumulado$
  equipoCount = this.services.equipo$
  planActivo = this.services.plan$
  loading: boolean = false;
  // aceptar: boolean = true
  payments!: Validate;
  id: number = 0
  constructor() {
    this.id = this.services.id_contrato.value;
  }
  ngOnInit(): void {
    if (this.id == 0) {
      this.router.navigate(['home/contratos'])
      this.services.deleteItems()
    }
    this.contrato = this.services.id_contrato.value
    this.plan = this.services.getPlan()
    this.getAllPackage()
    this.getTVBox()
    this.services.getPlan()
    this.services.getEquipo()
    this.getItemsTotalCount()
  }
  getItemsTotalCount() {
    this.services.getTotalAcumm()
    this.services.getTotalItems()
  }

  getAllPackage() {
    const params: ParamsGTV = new ParamsGTV();
    params.status = 'true'
    this.services.getAllPackages(params).then((result) => {
      this.packages = result
    }).catch((err) => {
      console.log(err)
    })
  }
  getTVBox() {
    this.services.getTvBox().then((result) => {
      this.tvbox = result
    }).catch((err) => {
      this.tvbox = []
    })

  }
  registrar() {
    this.loader.showLoading()
    this.loading = true;
    let contrato = 0
    this.services.id_contrato$.subscribe(data => contrato = data)
    let idplan = 0
    this.services.plan$.subscribe(data => (idplan = data[0].id));
    let idpackage: [] = []
    this.services.paquetes$.subscribe(data => {
      if (data.length > 0) {
        data.map((pack: any) => {
          let body = { package: pack.id }
          idpackage.push(body as never)
        })
      } else {
        idpackage = []
      }
    })
    let equipo = null
    this.services.equipo$.subscribe(data => {
      if (data.length > 0) {
        equipo = {
          "count": data[0].count,
          "cost": Number(data[0].cost * data[0].count),
          "product": data[0].product
        }
      } else {
        equipo = null
      }
    })
    let body = {
      "contract": contrato,
      "plan_type": idplan,
      "service_type": 4,
      "contract_detail_package": idpackage,
      "contract_detail_product": equipo,
      "payment": this.payments

    }
    // console.log(body, 'valores del registro')
    setTimeout(() => {
      this.loading = false
      this.services.addServiceTV(body).then((result) => {
        this.loader.hideLoading()
        // console.log(result)
        this.services.datos_cuentas$.next(result)
        this.snack.openSnack("Procesando la solicitud", "success")

        this.services.deleteItems()
        this.router.navigate(['home/gtv/cuentas']);
      }).catch((err) => {
        console.log(err)
        this.loader.hideLoading()
        if (err.status == 400) {
          this.snack.openSnack(err.error?.message, "error")
          this.snack.openSnack(err.error?.non_field_errors[0], "error")
          return
        }
        this.snack.openSnack(err?.statusText, "error")
        return

      })
    }, 500);

  }
}
