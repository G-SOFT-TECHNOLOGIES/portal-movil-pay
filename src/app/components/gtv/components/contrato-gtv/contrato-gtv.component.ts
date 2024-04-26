import { getAllPackages } from './../../../servicios/interface/paquetes.interface';
import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContractDetailPackage, ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { ConfirmComponent } from 'src/app/components/home/confirm/confirm.component';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { PlanID } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { ParamsGTV } from 'src/app/components/usuario/interfaces/contractosInterfaces';

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
  packages: any[] = []
  contrato!: ContratoID
  selected: any = []
  delete: number = 0
  showCanales: boolean = false
  contract_detail_Tv!: any
  canales !: PlanID;
  channels_plan_gtv: any[] = []
  paquetes: ContractDetailPackage[] = []
  id: number = 0
  constructor() {
    this.id = this.tvservices.id_contrato.value
  }
  ngOnInit(): void {
    this.id == 0 ? (this.router.navigate(['home/contratos']), this.tvservices.deleteItems(), this.loader.hideLoading()
    ) : (this.getContract())

  }
  getContract() {
    this.loader.showLoading()
    this.tvservices.getContratoTV(this.id).then((result: ContratoID) => {
      this.loader.hideLoading()
      this.contrato = result;
      let res = result.contract_detail.filter((contract) => contract.service_type.id === 4).map((contract) => contract)
      if (res.length > 0) {

        this.getPackageId()
        return
      }
      this.router.navigate(['home/contratos'])
      return
    }).catch((err) => {
      console.log(err)
      this.loader.hideLoading()
    })
  }
  getPackageId() {
    this.contrato.contract_detail.map((res) => {
      this.loader.hideLoading()
      if (res.service_type.id == 4) {
        this.contract_detail_Tv = res
        this.tvservices.getTypesServicesTVId(res.plan_type.id).then((result) => {
          this.canales = result
          this.showCanales = result.channels_plan_gtv.length > 0 ? true : false
        }).catch((err) => {
          console.log(err)
        })
        const params: ParamsGTV = new ParamsGTV()
        params.status = 'true'
        params.remove_pagination = 'true'
        this.tvservices.getAllPackagesContractDetail(res.id, params)
          .then((result) => {
            this.paquetes = result.results
            this.getAllPackages()
          }).catch((err) => {
            console.log(err)
          })
      }
      return this.loader.hideLoading()
    })
    this.loader.hideLoading()
  }


  Add() {
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
              this.paquetes = []
              this.packages = []
              this.getContract()
              this.getAllPackages()
            }).catch((error) => {
              console.log(error.status)
              this.loader.hideLoading()
              if (error.status == 400) {
                this.snack.openSnack(error.error?.message, '')
                this.snack.openSnack(error.error?.non_field_errors[0], '')

                return
              }
              this.snack.openSnack("Error. Por favor comuniquese con atencion al cliente", '')
              return
            })
        }

      }
    })
  }
  deletePackage() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { message: "¿Esta seguro de eliminar este paquete?" },
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loader.showLoading()
        let body = {}
        this.tvservices.updatePackageAccountTv(body, this.delete).then((value) => {
          this.loader.hideLoading()
          this.snack.openSnack("Eliminado exitosamente", '')
          this.router.navigate(['home/gtv/servicio', this.tvservices.id_contrato.value])
          this.getContract()
          this.getAllPackages()
        }).catch((error) => {
          console.log(error)
          this.loader.hideLoading()
          this.snack.openSnack("Ocurrio un error, intente de nuevo", '')
        })
      }
    })
  }

  getAllPackages() {
    const params: ParamsGTV = new ParamsGTV();
    params.status = 'true'
    this.tvservices.getAllPackages(params).then((result) => {
      if (this.paquetes.length > 0) {
        this.paquetes.map((pack) => {
          let packs = result.filter((pack_repet) => pack_repet.id != pack.package).map((data) => ({ ...data, active: true }))
          this.packages = packs
        })
        return this.packages
      } else {
        return this.packages = result
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
