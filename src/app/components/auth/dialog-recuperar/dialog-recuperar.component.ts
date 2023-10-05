import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-dialog-recuperar',
  templateUrl: './dialog-recuperar.component.html',
  styleUrls: ['./dialog-recuperar.component.css']
})
export class DialogRecuperarComponent {
  private form= inject(FormBuilder)
  private auth = inject(LoginService)
  private snack = inject(SnackbarService)

  constructor(private matDialog:MatDialogRef<DialogRecuperarComponent>){}
  selected = 'V';

  myForm= this.form.group({
    cedula:['',Validators.required],
    indicador:['V',Validators.required]
  })

  onSubmit(){
    const valor = this.myForm.value
    const cedula = `${valor.indicador}${valor.cedula}`
    this.auth.recuperarPass(cedula)
    .then((result) => {
      this.snack.openSnack('Contraseña enviada al correo','success')
      this.matDialog.close()
    }).catch((err) => {
      this.snack.openSnack(err,'error')
    });
  }

}
