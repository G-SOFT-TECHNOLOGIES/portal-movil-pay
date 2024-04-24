import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContractDetailPackage, ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { ConfirmComponent } from 'src/app/components/home/confirm/confirm.component';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { PlanID } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-contrato-gtv',
  templateUrl: './contrato-gtv.component.html',
  styleUrls: ['./contrato-gtv.component.css']
})
export class ContratoGtvComponent {
  private tvservices = inject(ServicoTvService)
  private router = inject(Router)
  private loader = inject(LoadingService)
  private dialog = inject(MatDialog);
  private snack = inject(SnackbarService)

  contrato!: ContratoID
  selected: any = []
  showCanales: boolean = false
  contract_detail_Tv!: any
  canales !: PlanID;
  channels_plan_gtv: any[] = []
  paquetes: ContractDetailPackage[] = []
  id: number = 0
  constructor(){
  this.id = this.tvservices.id_contrato.value
  }
  ngOnInit(): void {
    this.loader.showLoading()
    this.id == 0 ? (this.router.navigate(['home/contratos']), this.tvservices.deleteItems(), this.loader.hideLoading()
    ) : (this.getContract())

  }
  getContract() {
    this.tvservices.getContratoTV(this.id).then((result: ContratoID) => {
      this.loader.hideLoading()
      this.contrato = result;
      let res = result.contract_detail.filter((contract) => contract.service_type.id === 4).map((contract) => contract)
      console.log(res)
      if (res.length > 0) {
       return  this. getPackageId()
      }
      this.router.navigate(['home/contratos'])
      return 
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoading()
    })
  }
  getPackageId() {
    // this.loader.showLoading()
    this.contrato.contract_detail.map((res) => {
      this.loader.hideLoading()
      if (res.service_type.id == 4) {
        this.contract_detail_Tv = res
        console.log(this.contract_detail_Tv, 'this.contract_detail_Tv')
        this.paquetes = res.contract_detail_package
        this.tvservices.getTypesServicesTVId(res.plan_type.id).then((result) => {
          this.canales = result
          console.log(this.canales.channels_plan_gtv.length)
          // this.canales.channels_plan_gtv.map((data) => {
          //   this.channels_plan_gtv.push(data)
          // })
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
              this.getContract()
            }).catch((error) => {
              console.log(error.status)
              this.loader.hideLoading()
              if (error.status == 400) {
                this.snack.openSnack(error.error?.message, '')
                this.snack.openSnack(error.error?.non_field_errors[0], '')

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
