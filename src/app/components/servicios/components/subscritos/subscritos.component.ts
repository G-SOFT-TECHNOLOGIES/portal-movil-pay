import { Component, Input, inject } from '@angular/core';
import { ContractDetailPackage, ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { LoadingService } from 'src/app/components/service/loading.service';
import { PlanID } from '../../interface/servicestv.interface';
import { ServicoTvService } from '../../services/servico-tv.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmComponent } from 'src/app/components/home/confirm/confirm.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-subscritos',
  templateUrl: './subscritos.component.html',
  styleUrls: ['./subscritos.component.css']
})
export class SubscritosComponent {
  @Input() contrato!: ContratoID
  private tvservices = inject(ServicoTvService)
  private loader = inject(LoadingService)
  private dialog = inject(MatDialog);
  private snack = inject(SnackbarService)

  selected: any = []
  showCanales: boolean = false
  contract_detail_Tv!: any
  canales !: PlanID;
  channels_plan_gtv: any[] = []
  paquetes: ContractDetailPackage[] = []


  ngOnInit(): void {
    this.getPackageId();
  }

  getPackageId() {
    // this.loader.showLoading()
    this.contrato.contract_detail.map((res) => {

      if (res.service_type.id == 4) {
        this.contract_detail_Tv = res
        this.paquetes = res.contract_detail_package
        this.tvservices.getTypesServicesTVId(res.plan_type.id).then((result) => {
          this.canales = result
          this.canales.channels_plan_gtv.map((data) => {
            this.channels_plan_gtv.push(data)
          })
          this.showCanales = true
        }).catch((err) => {
          console.log(err)
        })
      }
      return this.loader.hideLoading()

    })
    this.loader.hideLoading()
  }
  // addPackage() {
  //   // console.log(this.contract_detail_Tv)  
  //   const dialogRef = this.dialog.open(DialogAddPackageComponent, {
  //     width: '600px',
  //     data: { paquetes: this.paquetes, contrato: this.contract_detail_Tv.id }
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.getPackageId()
  //     }
  //   })
  // }

  Add() {
    console.log(this.selected)
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { message: "¿Esta seguro de agregar los paquetes a su plan?" },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selected.length > 0) {
          this.loader.showLoading()
          this.tvservices.addServiceTVId(this.selected, this.contract_detail_Tv.id)
            .then((value) => {
              this.loader.hideLoading()
              this.getPackageId()
            }).catch((error) => {
              console.log(error.status)
              this.loader.hideLoading()
              if (error.status == 400) {
                this.snack.openSnack(error.error?.message, '')
                return
              }
              this.snack.openSnack("Error. Por favor comuniquese con el atencion al cliente", '')
              return
            })
        }

      }
    })

  }
}
