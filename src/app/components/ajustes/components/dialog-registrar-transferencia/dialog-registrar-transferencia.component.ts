import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/components/service/core.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { InfoService } from '../../services/info.service';
import { DialogRegistrarZelleComponent } from '../dialog-registrar-zelle/dialog-registrar-zelle.component';

@Component({
  selector: 'app-dialog-registrar-transferencia',
  templateUrl: './dialog-registrar-transferencia.component.html',
  styleUrls: ['./dialog-registrar-transferencia.component.css']
})
export class DialogRegistrarTransferenciaComponent {
  private info = inject(InfoService)
  private form = inject(FormBuilder)
  private core = inject(CoreService)
  private snack = inject(SnackbarService)
  user = this.core.getUser()
  myForm = this.form.group({
    name: ['', Validators.required],
    nro_cuenta: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern('[0-9]*')]],
  })
  constructor(
    public dialogRef: MatDialogRef<DialogRegistrarTransferenciaComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    if (this.data != null) {
      this.myForm.patchValue({
        name: this.data.name,
        nro_cuenta: this.data.sender
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    const valor = this.myForm.value
    const body = {
      "sender": valor.nro_cuenta,
      "name": valor.name,
      "method": 4,
      "email": null,
    }
    if (this.data != null) {
      this.info.patchMethodId(body, this.data.id)
        .then((data) => {
          this.snack.openSnack('Transferencia actualizada con exito', 'success')
          this.dialogRef.close(true)
        }).catch(error => {
          if (error.status == 400) {
            this.snack.openSnack("Ya existe un registro con este enviante: " + valor.nro_cuenta, 'error')
            return
          }
          this.snack.openSnack(error.error.message, 'error')
          return
        });
    } else {
      let copia: any = { ...body, 'client': this.user.id };
      this.info.postMethod(copia)
        .then((result) => {
          this.snack.openSnack('Transferencia registrada con exito', 'success')
          this.dialogRef.close(true)
        }).catch((error) => {
          if (error.status == 400) {
            this.snack.openSnack("Ya existe un registro con este enviante: " + valor.nro_cuenta, 'error')
            return
          }
          this.snack.openSnack(error.error.message, 'error')
          return
        });
    }
  }
}
