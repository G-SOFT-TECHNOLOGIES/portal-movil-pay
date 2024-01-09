import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-dialogo-alertas-globales',
  templateUrl: './dialogo-alertas-globales.component.html',
  styleUrls: ['./dialogo-alertas-globales.component.css']
})
export class DialogoAlertasGlobalesComponent {
  private login = inject(LoginService)
  constructor(private dialogRef: MatDialogRef<DialogoAlertasGlobalesComponent>) {}
  
}
