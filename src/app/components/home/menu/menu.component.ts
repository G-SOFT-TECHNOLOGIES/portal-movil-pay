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
  ajustes = this.login.ajustes$.value
  inicio = this.login.inicio$.value
  contratos = this.login.contratos$.value
  tickets = this.login.tickets$.value
  canjes = this.login.canjes$.value

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
