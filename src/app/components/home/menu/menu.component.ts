import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FacturaContratoService } from '../../finanzas/services/usuario.service';
import { LoginService } from '../../auth/services/login.service';
import { Alerts } from '../../auth/interfaces/LoginInterfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  private breakpointObserver = inject(BreakpointObserver);
  private login = inject(LoginService)
  valid: boolean = true;
  ajustes = this.login.getDataAjustes
  inicio = this.login.getDataInicio
  contratos = this.login.getDataContratos
  tickets = this.login.getDataTickets
  canjes = this.login.getDataCanjes

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.login.getAlerts()
  }

}
