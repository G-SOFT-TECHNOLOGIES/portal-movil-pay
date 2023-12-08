import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { DialogoDetallePaqueteComponent } from 'src/app/components/servicios/components/lista-planes/components/dialogo-detalle-paquete/dialogo-detalle-paquete.component';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-list-campaing',
  templateUrl: './list-campaing.component.html',
  styleUrls: ['./list-campaing.component.css']
})
export class ListCampaingComponent {
  private router = inject(Router)
  private usuario = inject(UsuarioService)
  @Input() campaing: any
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);

  cant: any = 0
  checked: boolean = false
  selectedPaquetes: any[] = [];



  ngOnInit() {
    this.selectedPaquetes = sessionStorage.getItem('campaing') as never
    this.getShoppingCant()
  }

  setShopping(e: any) {
    if (e) {
      this.usuario.setCampaings(this.campaing)
      this.getShoppingCant()
      console.log(e,  'check ')
      return
    } else {
      this.usuario.deleteCampaings(this.campaing)
      this.getShoppingCant()
      console.log(e, 'out')
      return
    }
  }

  getShoppingCant() {
    this.usuario.getCampaings()
    this.usuario.getTotalAcumm()

  }
  nextPage() {
    this.router.navigate(['home/servicios_tv/planes/complementos']);

  }
  verDetalles(id: any) {
    // this.tvservices.getPackages(Number(id)).then((result) => {
    //   const dialogRef = this.dialog.open(DialogoDetallePaqueteComponent, {
    //     width: '520px',
    //     data: result
    //   })
    // }).catch((erro) => {
    //   console.log(erro)
    // })

  }
}
