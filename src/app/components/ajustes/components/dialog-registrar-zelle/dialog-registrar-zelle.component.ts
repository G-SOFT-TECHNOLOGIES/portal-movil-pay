import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    name:['',Validators.required],
    titular:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
  })
  constructor(
    public dialogRef: MatDialogRef<DialogRegistrarZelleComponent>,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(){
    const valor = this.myForm.value
    const body = { 
      "sender": valor.titular,
      "email": valor.email,
      "name": valor.name,
      "method": 3,
      "client": this.user.id,
    }
    this.info.postMethod(body)
    .then((result) => {
      this.snack.openSnack('Zelle registrado con exito','success')
      this.dialogRef.close(true)
    }).catch((error) => {
      if (error== "Bad Request") {
        this.snack.openSnack("Ya existe un registro con este enviante: "+valor.titular, 'error')
        return
      }
      this.snack.openSnack(error, 'error')
    });
  }
}
