import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/components/service/confirm.service';
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
  imgDefault:string= '../../../../../assets/img/promo1.png'


  ngOnInit() {
     this.usuario.campaings$.subscribe(data=>{
      console.log(data)
      this.selectedPaquetes = data ? data : []
      })
    this.getShoppingCant()
  }

  setShopping(e: any) {
    console.log(e)
    if (e) {
      this.usuario.setCampaings(this.campaing)
      this.getShoppingCant()
      return
    } else {
      this.usuario.deleteCampaings(this.campaing)
      this.getShoppingCant()
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
