import { Component, Input, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/services/usuario.service';
import { LoadingService } from '../service/loading.service';
import { Contract } from '../usuario/interfaces/contractosInterfaces';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private usuario = inject(UsuarioService)
  private loader = inject(LoadingService)
  contratos$ = this.usuario.contractos$
  contratos = this.contratos$.subscribe(data => data)

  ngOnInit(): void {
    this.usuario.getContratos()
    this.loader.hideLoading()
  }

 
}
