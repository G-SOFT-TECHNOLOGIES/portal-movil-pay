import { Component, Input } from '@angular/core';
import { ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';

@Component({
  selector: 'app-contrato-gtv',
  templateUrl: './contrato-gtv.component.html',
  styleUrls: ['./contrato-gtv.component.css']
})
export class ContratoGtvComponent {
  @Input() contrato!: ContratoID
}
