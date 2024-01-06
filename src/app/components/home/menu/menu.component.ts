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
  alerts = this.login.alerts$
  valid: boolean = true;
  ajustes: Alerts[]=[]
  inicio: Alerts[]=[]
  contratos: Alerts[]=[]
  tickets: Alerts[]=[]
  canjes: Alerts[]=[]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.alerts.subscribe(data => {
      data.map((menu) => {
        if (menu.menu_patch == 'ajustes') {
          this.ajustes.push(menu)
        }
        if (menu.menu_patch == 'inicio') {
          this.inicio.push(menu)
        }
        if (menu.menu_patch == 'contratos') {
          this.contratos.push(menu)
        }
        if (menu.menu_patch == 'tickets') {
          this.tickets.push(menu)
        }
        if (menu.menu_patch == 'canjes') {
          this.canjes.push(menu)
        }
      })
    })
  }
}
