import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-resumen-cuenta',
  templateUrl: './resumen-cuenta.component.html',
  styleUrls: ['./resumen-cuenta.component.css']
})
export class ResumenCuentaComponent {
  private tvService = inject(ServicoTvService)

  paquetes = this.tvService.paquetes$
  plan = this.tvService.plan$
  equipos = this.tvService.equipo$
  @Output() response = new EventEmitter<boolean>()
  @Input() payments : any
  count = ['1', '2', '3']
  selected = new FormGroup({
    cant: new FormControl<any>('')
  })
  tvbox: any[] = []
  ngOnInit(): void {
    this.verificar()
    this.getTVBox()
  }
  delPaquete(e: any) {
    this.tvService.deletePaquetes(e)
    this.tvService.getPaquetes()
    this.tvService.getTotalAcumm()
  }
  delEquipo(e: any) {
    this.tvService.deleteEquipo(e)
    this.tvService.getEquipo()
    this.tvService.getTotalAcumm()
    this.verificar()

    return
  }

  verificar() {
    this.equipos.subscribe(data => {
      if (data.length > 0) {
        let cant = 0
        data.map((item) => cant = item.count)
        this.selected.patchValue({
          cant: cant.toString()
        })
        this.response.emit(true)
      } else {
        this.response.emit(true)

      }
    })
  }

  getCantTvBox() {
    let equipo = {
      "count": this.selected.value.cant,
      "cost": this.tvbox[0].cost,
      "product": this.tvbox[0].id,
      "name": this.tvbox[0].name
    }
    console.log(equipo)
    this.tvService.setEquipo(equipo)
    this.tvService.getEquipo()
    this.tvService.getTotalAcumm()
    this.verificar()

  }
  getTVBox() {
    this.tvService.getTvBox().then((result) => {
      this.tvbox = result
    }).catch((err) => {
      this.tvbox = []
    })

  }

}

