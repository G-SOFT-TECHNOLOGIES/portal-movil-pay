import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { LoadingService } from 'src/app/components/service/loading.service';
import { ActivationCode, Device, Gtv } from 'src/app/components/servicios/interface/gtv.interface';
import { PlanID } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { DialogEditPanatallaComponent } from '../dialog-edit-panatalla/dialog-edit-panatalla.component';
import { DialogEditTvboxComponent } from '../dialog-edit-tvbox/dialog-edit-tvbox.component';
import { SnackbarService } from 'src/app/components/service/snackbar.service';

@Component({
  selector: 'app-informacion-cuenta',
  templateUrl: './informacion-cuenta.component.html',
  styleUrls: ['./informacion-cuenta.component.css']
})
export class InformacionCuentaComponent {

  @Input() contrato!: any
  private tvservices = inject(ServicoTvService)
  private dialog = inject(MatDialog);
  private snack = inject(SnackbarService);
  private loader = inject(LoadingService); 
  devices: Device[]=[]

  activateCode: ActivationCode[]=[]
  cuenta = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(6), Validators.pattern('[A-Za-z0-9]*')]),
    pincode: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]),
  })
  modificar: boolean = true
  is_edit: boolean = true
  cuentaTv: Gtv | any

  ngOnInit(): void {
    this.contrato != undefined ? (this.getDetailGtv() ) : this.snack.openSnack("Recargue la página, por favor!", 'x')

  }
  isEditar() {
    this.modificar = false;
    this.is_edit = false
  }
  verPantallaUtilizadas(serialNumber:string) {
    // console.log(item, "Pantalla")
    let item =this.devices.filter((account:Device)=> account.serialNumber == serialNumber).map((account: Device)=> account) 
    const dialogRef = this.dialog.open(DialogEditPanatallaComponent, {
      width: '600px',
      data: { item: item, contrato: this.contrato.contract_detail_account.contract_detail, opcion: 1 }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDetailGtv()
        //  console.log(result)
      }
    })
  }

  verPantallaDisponibles(link:any) {
    let item =this.activateCode.filter((account)=> account.linkCode == link).map(account=> account) 
    // console.log(item, "Pantalla")
    const dialogRef = this.dialog.open(DialogEditPanatallaComponent, {
      width: '600px',
      data: { item: item, contrato: '', opcion: 0 }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.getDetailGtv()
        //  console.log(result)
      }
    })
  }
  verTvBox(item: any) {
    // console.log(item, 'tv')
    const dialogRef = this.dialog.open(DialogEditTvboxComponent, {
      width: '600px',
      data: item
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //  console.log(result)
      }
    })
  }
  getDetailGtv() {
    this.tvservices.getDetailGtv(this.contrato.id).then((value) => {
      this.cuentaTv = value.result
      this.devices = value.result.devices
      this.activateCode = value.result.activationCodes
      // this.cuenta.patchValue({
      //   username: value.result.userName,
      //   password: value.result.password,
      //   pincode: value.result.pinCode
      // })
      this.cuenta.patchValue({
        username: this.contrato.contract_detail_account.username,
        password: this.contrato.contract_detail_account.password,
        pincode:  this.contrato.contract_detail_account.pin_code
      })
    }).catch((err) => {

    })
  }
  updateAccount() {
    this.loader.showLoading()
    const valor = this.cuenta.value
    let body = {
      "password": valor.password,
      "pin_code": valor.pincode,
      "contract_detail": this.contrato.contract_detail_account.contract_detail
    }
    this.tvservices.updateAccountTv(body, this.contrato.contract_detail_account.id).then((value) => {
      this.loader.hideLoading()
      this.modificar = true;
      this.is_edit = true
    }).catch((error) => {
      console.log(error)
      if (error.status == 400) {
        this.snack.openSnack(error?.error.message, 'error')
      } else {
        this.snack.openSnack(error, 'error')
      }
      this.loader.hideLoading()

    })
  }

}
