import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContractDetailPackage } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ParamsGTV } from 'src/app/components/usuario/interfaces/contractosInterfaces';
import { DialogDetallePlanComponent } from '../../../dialog-detalle-plan/dialog-detalle-plan.component';
import { DialogDetallePaquetesGtvComponent } from '../../../dialog-detalle-paquetes-gtv/dialog-detalle-paquetes-gtv.component';
import { Package } from 'src/app/components/servicios/interface/paquetes.interface';

@Component({
  selector: 'app-add-lista-paquetes',
  templateUrl: './add-lista-paquetes.component.html',
  styleUrls: ['./add-lista-paquetes.component.css']
})
export class AddListaPaquetesComponent {
  private tvservices = inject(ServicoTvService)
  private dialog = inject(MatDialog);
  private loader = inject(LoadingService)
  checked: boolean = false

  selecionados: any[] = []
  @Input() packages: Package[] = []
  @Output() selected = new EventEmitter()
  listPackage = new FormGroup({
    package: new FormControl<any>('')
  })
  ngAfterViewInit(): void {
    this.selecionados =[]
  }

  setShopping(e: any, paquete: any) {
    let target = e.target as HTMLInputElement
    if (target.checked) {
      this.selecionados.push(paquete.id)
      this.selected.emit(this.selecionados)
      return
    } else {
      this.selecionados = this.selecionados.filter(sel => sel != paquete.id);
      this.selected.emit(this.selecionados)
      return
    }
  }
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
