import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../auth/services/login.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent {
  private login = inject(LoginService)
  alerts = this.login.ajustes
  afiliar =this.alerts.filter((menu) => menu.code == "payment_methods_add").map(data => data)
 
}
