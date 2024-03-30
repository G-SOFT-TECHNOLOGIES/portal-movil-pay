import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/components/service/core.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-dialog-registrar-zelle',
  templateUrl: './dialog-registrar-zelle.component.html',
  styleUrls: ['./dialog-registrar-zelle.component.css']
})
export class DialogRegistrarZelleComponent {
  private info = inject(InfoService)
  private form = inject(FormBuilder)
  private core = inject(CoreService)
  private snack = inject(SnackbarService)
  user = this.core.getUser()

  myForm = this.form.group({
    name: ['', Validators.required],
    titular: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  })
  constructor(
    public dialogRef: MatDialogRef<DialogRegistrarZelleComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    if (this.data != null) {
      this.myForm.patchValue({
        name: this.data.name,
        titular: this.data.sender,
        email: this.data.email
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    const valor = this.myForm.value
    const body = {
      "sender": valor.titular,
      "email": valor.email,
      "name": valor.name,
      "method": 3,
    }

    if (this.data != null) {
      this.info.patchMethodId(body, this.data.id)
        .then((data) => {
          this.snack.openSnack('Zelle actualizado con exito', 'success')
          this.dialogRef.close(true)
        }).catch(error => {
          if (error.status == 400) {
            this.snack.openSnack("Ya existe un registro con este enviante: " + valor.titular, 'error')
            return
          }
          this.snack.openSnack(error.error.message, 'error')
          return
        });
    } else {
      let copia: any = { ...body, 'client': this.user.id };
      this.info.postMethod(copia)
        .then((result) => {
          this.snack.openSnack('Zelle registrado con exito', 'success')
          this.dialogRef.close(true)
        }).catch((error) => {
          if (error.status == 400) {
            this.snack.openSnack("Ya existe un registro con este enviante: " + valor.titular, 'error')
            return
          }
          this.snack.openSnack(error.error.message, 'error')
          return
        });
    }
  }
}
