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
  ajustes: boolean = false
  inicio: boolean = false
  contratos: boolean = false
  tickets: boolean = false
  canjes: boolean = false

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngAfterViewInit(): void {
    // this.login.getAlerts()
    setTimeout(() => {
      this.ajustes = this.login.ajustes$.value.length > 0
      this.inicio = this.login.inicio$.value.length > 0
      this.contratos = this.login.contratos$.value.length > 0
      this.tickets = this.login.tickets$.value.length > 0
      this.canjes = this.login.canjes$.value.length > 0
    }, 2000)

  }
}
