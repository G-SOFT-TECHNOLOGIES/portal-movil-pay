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
  afiliar :any
  constructor() {
    this.afiliar =this.login.ajustes$.value.filter((menu) => menu.code == "payment_methods_add_ajustes").map(data => data)
  }
  ngOnInit(): void {

  }
}
