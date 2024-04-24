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

  @Input() paquetes: ContractDetailPackage[] = []
  @Output() selected: EventEmitter<any> = new EventEmitter()
  packages: any[] = []
  selecionados: any[] = []
  listPackage = new FormGroup({
    package: new FormControl<any>('')
  })
  ngOnInit(): void {
    const params: ParamsGTV = new ParamsGTV();
    params.status = 'true'
    this.tvservices.getAllPackages(params).then((result) => {
      if (this.paquetes.length >0) {
        this.paquetes.map((pack) => {
          this.packages = result.filter((pack_repet) => pack_repet.id != pack.package).map(data => data)
        })
      } else {
        this.packages = result
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  setShopping(e: any, paquete: any) {
    let target = e.target as HTMLInputElement
    console.log(target.checked)
    if (target.checked) {
      this.selecionados.push(paquete.id)
      this.selected.emit(this.selecionados)

      return
    } else {
      this.selecionados =  this.selecionados.filter(sel => sel != paquete.id);
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
