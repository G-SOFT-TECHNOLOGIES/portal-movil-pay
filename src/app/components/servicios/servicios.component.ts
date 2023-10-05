import { Component, inject } from '@angular/core';
import { LoadingService } from '../service/loading.service';
import { UsuarioService } from '../usuario/services/usuario.service';
import { ServicoTvService } from './services/servico-tv.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {
  private tvservices = inject(ServicoTvService)
  ngOnInit(): void {

    this.tvservices.deleteItems()
  }
 
 


}
