import { Component, Inject, inject } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from '../../home/confirm/confirm.component';

@Component({
  selector: 'app-dialogo-pasos-afiliacion',
  templateUrl: './dialogo-pasos-afiliacion.component.html',
  styleUrls: ['./dialogo-pasos-afiliacion.component.css']
})
export class DialogoPasosAfiliacionComponent {
  private login = inject(LoginService)
  afiliar = this.login.ajustes$.value.filter((menu) => menu.code == "payment_methods_add_ajustes").map(data => data)
  msg1: boolean = true
  msg2: boolean = false
  msg3: boolean = false
  constructor(private dialogRef: MatDialogRef<DialogoPasosAfiliacionComponent>) { }


  finalizarPasoAPaso() {
    console.log(this.afiliar[0].code)
    let body = {
      code: this.afiliar[0].code
    }
    this.login.updateAlerts(body).then((value) => {
      this.login.deleteAlerts(this.afiliar[0].code)
      this.dialogRef.close(true)
    }).catch((error) => {
      console.log(error)
    })
  }

}
