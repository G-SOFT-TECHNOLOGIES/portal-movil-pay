import { Component, EventEmitter, Output, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { LoadingService } from 'src/app/components/service/loading.service';

@Component({
  selector: 'app-dialogo-resumen-cupones',
  templateUrl: './dialogo-resumen-cupones.component.html',
  styleUrls: ['./dialogo-resumen-cupones.component.css']
})
export class DialogoResumenCuponesComponent {
  private usuario = inject(UsuarioService)
  private usuario2 = inject(FacturaContratoService)
  private router = inject(Router)
  private rout = inject(ActivatedRoute)
  private loader = inject(LoadingService)
  private snack = inject(SnackbarService)
  @Output() visible = new EventEmitter<boolean>()
  paquetes = this.usuario.campaings$
  totalAmount = this.usuario.totalAcumulado$
  misCupones: number = this.usuario.mispuntos.value
  id: number = 0
  sub !: Subscription

  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
  delPaquete(e: any) {
    this.usuario.deleteCampaings(e)
    this.usuario.getTotalAcumm()
  }

  verResumen() {
    this.router.navigate(['home/servicios_tv/planes/finalizar', this.id])
  }
  canjearCupon() {
    this.loader.showLoading()
    let arr: any[] = []
    this.paquetes.subscribe(data => {
      data.map((cupons) => {
        arr.push(cupons.id)
      })
    })
    let body = {
      'campaign_coupon': arr,
      'contract': this.id,
    }
    this.usuario.setGenerateCuopon(body).then((result) => {
      this.loader.hideLoading()
      this.visible.emit(false)
      this.usuario2.getContrato(this.id)
      this.snack.openSnack("Cupon adquirido correctamente", '')
    }).catch((error) => {
      this.loader.hideLoading()
      this.snack.openSnack(error.messagge, '')
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
