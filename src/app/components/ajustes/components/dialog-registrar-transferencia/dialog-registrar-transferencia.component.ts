import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    name:['',Validators.required],
    nro_cuenta:['',[Validators.required,Validators.maxLength(4),Validators.minLength(4), Validators.pattern('[0-9]*')]],
  })
  constructor( 
    public dialogRef: MatDialogRef<DialogRegistrarTransferenciaComponent>,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(){
    const valor = this.myForm.value
    const body = { 
      "phone": valor.nro_cuenta,
      "name": valor.name,
      "method": 4,
      "client": this.user.id,
    }
    this.info.postMethod(body)
    .then((result) => {
      this.snack.openSnack('Transferencia registrada con exito','success')
      this.dialogRef.close(true)
    }).catch((err) => {
      console.log(err);
    });
  }
}
