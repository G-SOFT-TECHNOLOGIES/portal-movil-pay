import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-datos-validados',
  templateUrl: './datos-validados.component.html',
  styleUrls: ['./datos-validados.component.css']
})
export class DatosValidadosComponent {
  private tvservices = inject(ServicoTvService)
  private router = inject(Router)
  private loader = inject(LoadingService);
  private snack = inject(SnackbarService);
  cuenta = this.tvservices.datos_cuentas$
  pantallas = ['1', '2', '3']
  id_contrato: number = 0
  ngOnInit(): void {
    this.tvservices.itemsCount.next(0)
    this.tvservices.id_contrato$.subscribe(data => {
      this.id_contrato = data
    })
  }
  finalizar() {
    this.router.navigate(['home/contratos', this.id_contrato]);
    this.tvservices.deleteItems()
    this.tvservices.deleteIdContrato()

  }
}
