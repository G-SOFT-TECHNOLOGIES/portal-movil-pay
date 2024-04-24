import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { DialogoPagarComponent } from 'src/app/components/servicios/components/pagos/dialogo-pagar/dialogo-pagar.component';
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
  private dialog = inject(MatDialog);
  contrato: number = 0
  tvbox: any[] = []
  packages: Packages[] = []
  acumulado = this.services.totalAcumulado$
  equipoCount = this.services.equipo$
  planActivo = this.services.plan$
  paquetes = this.services.paquetes$
  loading: boolean = false;
  totalTvBox = this.services.totalTvBox$
  aceptar: boolean = true
  payments!: Validate;
  id: number = 0
  montoMenor: boolean = false

  constructor() {
    this.id = this.services.id_contrato.value;
  }
  ngOnInit(): void {
    if (this.id == 0) {
      this.services.deleteItems()
      this.router.navigate(['home/contratos'])
    }

    this.contrato = this.services.id_contrato.value
    this.getAllPackage()
    this.getTVBox()
    this.services.getPlan()
    this.services.getPaquetes()
    this.services.getEquipo()
    this.getItemsTotalCount()
    console.log(this.services.initPaquete)
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
  pagar(monto: any) {

    const dialogRef = this.dialog.open(DialogoPagarComponent, {
      width: '520px',
      data: {
        monto,
        contract: this.id,
        opcion: 'gtv'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.services.pagoTvBox$.subscribe(data => this.payments = data)
      console.log(this.payments)
      if (this.payments != null) {
        // console.log()
        // console.log(this.payments.amount, monto, this.payments.amount < monto)
        if (this.payments.amount < monto) {
          this.aceptar = this.payments.amount < monto
          this.montoMenor = true
          this.snack.openSnack("El monto es menor a la cantidad a Pagar", "error")
        }
      }
    })
  }

}
