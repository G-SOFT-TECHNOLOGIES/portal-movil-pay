import { Component, inject } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-actualizaciones',
  templateUrl: './dialogo-actualizaciones.component.html',
  styleUrls: ['./dialogo-actualizaciones.component.css']
})
export class DialogoActualizacionesComponent {
  nextmsg: boolean = false;
  private login = inject(LoginService)
  msg = this.login.contratos$.value.filter((menu) => menu.code == "payment_methods_add_contrato").map(data => data)
  constructor(private dialogRef: MatDialogRef<DialogoActualizacionesComponent>) { }
  closeMsg() {
    console.log(this.msg[0].code)
    let body = {
      code: this.msg[0].code
    }
    this.login.updateAlerts(body).then((value) => {
      this.dialogRef.close(true)
      this.login.deleteAlerts(this.msg[0].code)
    }).catch((error) => {
      console.log(error)
      this.msg = []
    })
  }
}
