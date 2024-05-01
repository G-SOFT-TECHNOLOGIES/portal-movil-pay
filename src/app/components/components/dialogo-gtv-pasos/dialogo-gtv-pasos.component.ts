import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-dialogo-gtv-pasos',
  templateUrl: './dialogo-gtv-pasos.component.html',
  styleUrls: ['./dialogo-gtv-pasos.component.css']
})
export class DialogoGtvPasosComponent {
  private login = inject(LoginService)
  afiliar = this.login.ajustes$.value.filter((menu) => menu.code == "gtv_contrato").map(data => data)
  msg1: boolean = true
  msg2: boolean = false
  msg3: boolean = false
  msg4: boolean = false
  constructor(private dialogRef: MatDialogRef<DialogoGtvPasosComponent>) { }


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
