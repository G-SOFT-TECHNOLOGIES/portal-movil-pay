import { Component, inject } from '@angular/core';
import { FacturaContratoService } from './services/usuario.service';
import { LoginService } from '../auth/services/login.service';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css']
})
export class FinanzasComponent {
  private usuario = inject(FacturaContratoService)
  private login = inject(LoginService)

  monto$= this.usuario.montoDollar$
  ngOnInit(): void {    
    this.usuario.getDollar()    

  }
}
