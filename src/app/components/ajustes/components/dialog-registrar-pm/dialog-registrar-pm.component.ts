import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { InfoService } from '../../services/info.service';
import { CoreService } from 'src/app/components/service/core.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';

@Component({
  selector: 'app-dialog-registrar-pm',
  templateUrl: './dialog-registrar-pm.component.html',
  styleUrls: ['./dialog-registrar-pm.component.css']
})
export class DialogRegistrarPmComponent {

  private info = inject(InfoService)
  private form = inject(FormBuilder)
  private core = inject(CoreService)
  private snack = inject(SnackbarService)

  user = this.core.getUser()
  myForm = this.form.group({
    name: ['', Validators.required],
    phone: ['', Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')],
  })

  constructor(
    public dialogRef: MatDialogRef<DialogRegistrarPmComponent>,
  ) { }



  onSubmit() {
    const valor = this.myForm.value
    const body = {
      "sender": valor.phone,
      "name": valor.name,
      "email": null,
      "method": 1,
      "client": this.user.id,
    }
    this.info.postMethod(body)
      .then((data) => {
        console.log(data)
        this.snack.openSnack('Pago Movil registrado con exito', 'success')
        this.dialogRef.close(true)
      }).catch(error => {
        if (error== "Bad Request") {
          this.snack.openSnack("Ya existe un registro con este enviante: "+valor.phone, 'error')
          return
        }
        this.snack.openSnack(error, 'error')
        return
      });
  }
}
