import { Component, Input, inject } from '@angular/core';
import { Contract } from 'src/app/components/usuario/interfaces/contractosInterfaces';
import { ServicoTvService } from '../../services/servico-tv.service';

@Component({
  selector: 'app-select-contratos',
  templateUrl: './select-contratos.component.html',
  styleUrls: ['./select-contratos.component.css']
})
export class SelectContratosComponent {
  private tvservices = inject(ServicoTvService)
  @Input() contrato: any
  ngOnInit(): void {
    this.tvservices.deleteItems()
  }
}
