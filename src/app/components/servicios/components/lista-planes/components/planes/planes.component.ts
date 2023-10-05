import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { DialogoDetallePaqueteComponent } from '../dialogo-detalle-paquete/dialogo-detalle-paquete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {
  private router = inject(Router)
  private tvservices = inject(ServicoTvService)
  @Input() paquetes: any
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);

  cant: any = 0
  checked: boolean = false
  selectedPaquetes: any[] = [];



  ngOnInit() {
    this.selectedPaquetes = sessionStorage.getItem('paquetes') as never
    this.getShoppingCant()
  }

  setShopping(e: any) {
    if (e) {
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
      const dialogRef = this.dialog.open(DialogoDetallePaqueteComponent, {
        width: '520px',
        data: result
      })
    }).catch((erro) => {
      console.log(erro)
    })

  }
}
