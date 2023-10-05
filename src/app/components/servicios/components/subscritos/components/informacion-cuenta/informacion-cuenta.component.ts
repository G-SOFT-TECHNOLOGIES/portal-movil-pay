import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { LoadingService } from 'src/app/components/service/loading.service';
import { Gtv } from 'src/app/components/servicios/interface/gtv.interface';
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
  cuenta = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(6), Validators.pattern('[A-Za-z0-9]*')]),
    pincode: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]),
  })
  modificar: boolean = true
  is_edit: boolean = true
  cuentaTv: Gtv | any

  ngOnInit(): void {
    console.log(this.contrato)
    this.getDetailGtv()

  }
  isEditar() {
    this.modificar = false;
    this.is_edit = false
  }
  verPantallaUtilizadas() {
    // console.log(item, "Pantalla")
    const dialogRef = this.dialog.open(DialogEditPanatallaComponent, {
      width: '600px',
      data: { item: this.cuentaTv.devices, contrato: this.contrato.contract_detail_account.contract_detail, opcion: 1 }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDetailGtv()
        //  console.log(result)
      }
    })
  }

  verPantallaDisponibles() {
    // console.log(item, "Pantalla")
    const dialogRef = this.dialog.open(DialogEditPanatallaComponent, {
      width: '600px',
      data: { item: this.cuentaTv.activationCodes, contrato: '', opcion: 0 }
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
      console.log(value, 'datos')
      this.cuentaTv = value.result
      this.cuenta.patchValue({
        username: value.result.userName,
        password: value.result.password,
        pincode: value.result.pinCode
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
      console.log(value, 'respuesta')
      this.loader.hideLoading()
      this.modificar = true;
      this.is_edit = true
    }).catch((error) => {
      console.log(error)
      if (error.status == 400) {
        this.snack.openSnack(error, 'error')
      } else {
        this.snack.openSnack(error, 'error')
      }
      this.loader.hideLoading()

    })
  }

}
