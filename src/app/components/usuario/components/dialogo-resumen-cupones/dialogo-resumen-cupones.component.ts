import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/components/service/snackbar.service';

@Component({
  selector: 'app-dialogo-resumen-cupones',
  templateUrl: './dialogo-resumen-cupones.component.html',
  styleUrls: ['./dialogo-resumen-cupones.component.css']
})
export class DialogoResumenCuponesComponent {
  private usuario = inject(UsuarioService)
  private router = inject(Router)
  private rout = inject(ActivatedRoute)
  private snack = inject(SnackbarService)
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
  ngOnInit(): void {
    console.log(this.misCupones)
    // this.plan.subscribe(data => this.id = data[0].id)
  }
  delPaquete(e: any) {
    this.usuario.deleteCampaings(e)
    this.usuario.getTotalAcumm()
  }

  verResumen() {
    this.router.navigate(['home/servicios_tv/planes/finalizar', this.id])
  }
  canjearCupon() {
    let arr: any[] = []
    this.paquetes.subscribe(data => {
      data.map((cupons) => {
        console.log(cupons, 'arr')
        arr.push(cupons.id)
      })
    })
    let body = {
      'campaign_coupon': arr,
      'contract': this.id,
    }
    console.log(body, 'el body')
    this.usuario.setGenerateCuopon(body).then((result) => {
      console.log(result)
      this.snack.openSnack("Cupon canjeado correctamente", '')
    }).catch((error) => {
      console.log(error)
      this.snack.openSnack("Eror al canjear cupon", '')

    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
