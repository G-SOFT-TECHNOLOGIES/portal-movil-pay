import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DialogPagarComponent } from 'src/app/components/finanzas/components/dialog-pagar/dialog-pagar.component';
import { Invoice } from 'src/app/components/finanzas/interfaces/UsuarioInterfaces';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { DialogoPagarComponent } from '../../../pagos/dialogo-pagar/dialogo-pagar.component';
import { LoadingService } from 'src/app/components/home/services/loading.service';
import { AnyObject } from 'chart.js/dist/types/basic';
import { Validate } from 'src/app/components/servicios/interface/pagos.interface';
import { SnackbarService } from 'src/app/components/service/snackbar.service';

@Component({
  selector: 'app-complementos',
  templateUrl: './complementos.component.html',
  styleUrls: ['./complementos.component.css']
})
export class ComplementosComponent {
  private tvservices = inject(ServicoTvService)
  private router = inject(Router)
  private rout = inject(ActivatedRoute)
  private dialog = inject(MatDialog);
  private loader = inject(LoadingService);
  private snack = inject(SnackbarService);

  sub !: Subscription
  id: number = 0
  id_contrato: number = 0
  shopping$ = this.tvservices.paquetes$ 
  loading: boolean = false;
  siguiente: boolean = false
  equipoValido: boolean = false
  aceptar: boolean = true
  lista_paquetes: any = []
  acumulado = this.tvservices.totalAcumulado$
  totalTvBox = this.tvservices.totalTvBox$
  payments!: Validate;
  montoMenor: boolean = false

  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
  ngOnInit(): void {
    this.tvservices.id_contrato$.subscribe(data => this.id_contrato = data)
    this.tvservices.getPlan()
    this.tvservices.getPaquetes()
    this.tvservices.getEquipo()
    this.tvservices.getTotalAcumm()
    this.tvservices.getTotalItems()
    this.tvservices.getIdContract()
  }

  previosPagePlanes() {
    this.router.navigate(['home/servicios_tv/planes/detalles', this.id]);
  }
  registrar() {
    this.loader.showLoading()
    this.loading = true;
    let contrato = 0
    this.tvservices.id_contrato$.subscribe(data => contrato = data)
    let idplan = 0
    this.tvservices.plan$.subscribe(data => (idplan = data[0].id));
    let idpackage: [] = []
    this.tvservices.paquetes$.subscribe(data => {
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
    this.tvservices.equipo$.subscribe(data => {
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
      this.tvservices.addServiceTV(body).then((result) => {
        this.loader.hideLoading()
        // console.log(result)
        this.tvservices.datos_cuentas$.next(result)
        this.snack.openSnack("Procesando la solicitud", "success")

        this.tvservices.deleteItems()
        this.router.navigate(['home/servicios_tv/planes/suscripcion']);
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
        contract: this.id_contrato,
        opcion: 'gtv'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.tvservices.pagoTvBox$.subscribe(data => this.payments = data)
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

  validarCupon() {

  }
}
