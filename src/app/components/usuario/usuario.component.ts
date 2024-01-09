import { Component, inject } from '@angular/core';
import { LoadingService } from '../service/loading.service';
import { UsuarioService } from './services/usuario.service';
import { LoginService } from '../auth/services/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  private usuario = inject(UsuarioService)
  private loader = inject(LoadingService)
  private login = inject(LoginService)
  contratos$ = this.usuario.contractos$
  afiliar = this.login.contratos$.value.filter((menu) => menu.code == "payment_methods_add_contrato").map(data => data)
  ngOnInit(): void {
    this.usuario.getContratos()
    this.login.getDataContratos
  }
}
