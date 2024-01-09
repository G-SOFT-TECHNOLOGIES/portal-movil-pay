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
import { ViewEncapsulation } from '@angular/compiler';

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
  mode_mobile = window.innerWidth > 639 ? (this.login.msg_alerts.value ? this.openAlerts() : false) : true
  view_alerts: boolean = this.login.msg_alerts.value

  constructor() { }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.mode_mobile = window.innerWidth > 639 ? false : true
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.view_alerts = this.login.msg_alerts.value == null ? (this.login.arr_alerts.value.length > 0 ? true : false) : this.login.msg_alerts.value
  }
  menuClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  ngAfterViewInit(): void {
    this.login.getAlerts()
  }
  ngOnInit(): void {
    this.user = this.core.getUser()
    this.facturaContrato.getDollar()
    this.mode_mobile = window.innerWidth > 639 ? false : true
    this.view_alerts = this.login.msg_alerts.value == null ? (this.login.arr_alerts.value.length > 0 ? true : false) : this.login.msg_alerts.value
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
}
