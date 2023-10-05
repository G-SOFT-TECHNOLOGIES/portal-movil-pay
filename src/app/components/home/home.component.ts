import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, map, shareReplay } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { UsuarioService } from '../usuario/services/usuario.service';
import { LoginService } from '../auth/services/login.service';
import { CoreService } from '../service/core.service';
import { FacturaContratoService } from '../finanzas/services/usuario.service';

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
  private facturaContrato = inject(FacturaContratoService)
  monto$ = this.facturaContrato.montoDollar$
  isOpen: boolean = false;
  sidebarVisible: boolean = false;
  screenWidth: number = 0
  screenHeight: number = 0
  loading: Observable<boolean> = this.load.loading$
  user!: any
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
  ngOnInit() {
    this.user = this.core.getUser()
    this.facturaContrato.getDollar()

  }
  logout() {
    this.services.logout()
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
