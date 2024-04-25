import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { DialogDetallePaquetesGtvComponent } from '../../../dialog-detalle-paquetes-gtv/dialog-detalle-paquetes-gtv.component';

@Component({
  selector: 'app-package-gtv',
  templateUrl: './package-gtv.component.html',
  styleUrls: ['./package-gtv.component.css']
})
export class PackageGtvComponent {
  private router = inject(Router)
  private tvservices = inject(ServicoTvService)
  @Input() paquetes: any
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);

  cant: any = 0
  checked: boolean = false
  selectedPaquetes: any[] = [];



  ngOnInit() {
    this.selectedPaquetes = localStorage.getItem('paquetes') as never
    this.getShoppingCant()
  }

  setShopping(e: any) {
    let target = e.target as HTMLInputElement
    console.log(target.checked)
    if (target.checked) {
      this.tvservices.setPaquetes(this.paquetes)
      this.getShoppingCant()
      return
    } else {
      this.tvservices.deletePaquetes(this.paquetes)
      this.getShoppingCant()
      return
    }
  } 

  getShoppingCant() {
    this.tvservices.getPaquetes()
    this.tvservices.getTotalAcumm()

  }
  nextPage() {
    this.router.navigate(['home/servicios_tv/planes/complementos']);

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
