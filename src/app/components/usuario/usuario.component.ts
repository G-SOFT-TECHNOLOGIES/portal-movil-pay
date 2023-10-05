import { Component, inject } from '@angular/core';
import { LoadingService } from '../service/loading.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  private usuario = inject(UsuarioService)
  private loader = inject(LoadingService)
  contratos$ = this.usuario.contractos$
  ngOnInit(): void {
    this.usuario.getContratos()
  }
}
