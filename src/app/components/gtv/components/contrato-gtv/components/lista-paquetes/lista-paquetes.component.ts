import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractDetailPackage } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogDetallePaquetesGtvComponent } from '../../../dialog-detalle-paquetes-gtv/dialog-detalle-paquetes-gtv.component';

@Component({
  selector: 'app-lista-paquetes',
  templateUrl: './lista-paquetes.component.html',
  styleUrls: ['./lista-paquetes.component.css']
})
export class ListaPaquetesComponent {
  private tvservices = inject(ServicoTvService)
  private dialog = inject(MatDialog);
  @Output() delete = new EventEmitter()
  listPackage = new FormGroup({
    package: new FormControl<any>('')
  })
  @Input() paquetes: ContractDetailPackage[] = []
  constructor() {}

  verDetalles(id: any) {
    this.tvservices.getPackages(Number(id)).then((result) => {
      const dialogRef = this.dialog.open(DialogDetallePaquetesGtvComponent, {
        width: '520px',
        data: result
      })
    }).catch((erro) => {
      console.log(erro)
    })
  }
}
