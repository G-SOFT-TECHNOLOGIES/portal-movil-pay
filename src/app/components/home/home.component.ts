import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, map, shareReplay } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { UsuarioService } from '../usuario/services/usuario.service';
import { LoginService } from '../auth/services/login.service';
import { CoreService } from '../service/core.service';
import { FacturaContratoService } from '../finanzas/services/usuario.service';
import { Alerts } from '../auth/interfaces/LoginInterfaces';
import { DialogoAlertasGlobalesComponent } from '../components/dialogo-alertas-globales/dialogo-alertas-globales.component';
import { MatDialog } from '@angular/material/dialog';
import { ConstantPool, ViewEncapsulation } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private load = inject(LoadingService)
  private services = inject(LoginService)
  private usuario = inject(UsuarioService)
  private core = inject(CoreService)
  private login = inject(LoginService)
  private breakpointObserver = inject(BreakpointObserver);
  private facturaContrato = inject(FacturaContratoService)
  private dialog = inject(MatDialog);

  monto$ = this.facturaContrato.montoDollar$
  isOpen: boolean = false;
  sidebarVisible: boolean = false;
  screenWidth: number = 0
  screenHeight: number = 0
  loading: Observable<boolean> = this.load.loading$
  user!: any
  mode_mobile: any = window.innerWidth > 639 ? false : true
  view_alerts: boolean = this.login.msg_alerts.value == null ? (this.login.arr_alerts.value.length > 0 ? true : false) : this.login.msg_alerts.value
  campana: boolean = this.mode_mobile
  constructor() {

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  menuClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.login.getAlerts()
    this.getStatusMenu()
    this.user = this.core.getUser()

    this.facturaContrato.getDollar()
  }

  logout() {
    this.services.logout()
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  openAlerts() {
    const dialogRef = this.dialog.open(DialogoAlertasGlobalesComponent, {
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.view_alerts = false
        sessionStorage.setItem('view_alerts', 'false')
        // this.login.msg_alerts.next(false)
      }
    })
  }
  getStatusMenu() {
    setTimeout(() => {
      this.campana = this.mode_mobile ? true :  false;
      let msg_alerts = JSON.parse(sessionStorage.getItem('view_alerts') as never)
      this.campana && this.mode_mobile ? '' : (msg_alerts == true ? this.openAlerts() : '')
     console.log( this.login.contratos$.value)
    }, 1500)
  }
}
