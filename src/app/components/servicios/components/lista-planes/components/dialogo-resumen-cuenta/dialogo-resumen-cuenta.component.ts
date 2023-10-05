import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-dialogo-resumen-cuenta',
  templateUrl: './dialogo-resumen-cuenta.component.html',
  styleUrls: ['./dialogo-resumen-cuenta.component.css']
})
export class DialogoResumenCuentaComponent {
  private tvService = inject(ServicoTvService)
  private router = inject(Router)
  paquetes = this.tvService.paquetes$
  plan = this.tvService.plan$
  equipos = this.tvService.equipo$
  id: number = 0
  ngOnInit(): void {
    this.plan.subscribe(data => this.id = data[0].id)
  }
  delPaquete(e: any) {
    this.tvService.deletePaquetes(e)
    this.tvService.getPaquetes()
    this.tvService.getTotalItems()
    this.tvService.getTotalAcumm()
  }
  delEquipo(e: any) {
    this.tvService.deleteEquipo(e)
    this.tvService.getEquipo()
    this.tvService.getTotalItems()
    this.tvService.getTotalAcumm()
    return
  }
  verResumen() {
    this.router.navigate(['home/servicios_tv/planes/finalizar', this.id])
  }

}
