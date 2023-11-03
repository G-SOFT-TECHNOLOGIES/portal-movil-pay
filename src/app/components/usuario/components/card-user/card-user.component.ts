import { Component, Input, inject } from '@angular/core';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { UsuarioService } from '../../services/usuario.service';
import { Contract } from '../../interfaces/contractosInterfaces';
import { Router } from '@angular/router';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { ContractDetailPackage } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { ContractDetail } from 'src/app/components/ajustes/interfaces/TicketInterfaces';
import { SnackbarService } from 'src/app/components/service/snackbar.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent {
  @Input() contratos: Contract | any
  private router = inject(Router)
  private tvservices = inject(ServicoTvService);
  private snack = inject(SnackbarService);
  contract: ContractDetail | any

  ngOnInit(): void {
    this.tvservices.getContratoTV(this.contratos.id).then((value) => {
      this.contract = value.contract_detail
    }).catch((error) => {
      console.log(error)

    })
  }
  redireccionar(contrato: Contract) {
    const id = contrato.id
    this.router.navigate([`contratos/finanzas`])
  }
  IrDetalle(contrato: number) {
    let plan = 0
    this.tvservices.id_servicestv$.subscribe(data => plan = data)
    console.log(contrato, 'cont')
    if (contrato) {
      this.tvservices.setIdContrato(contrato)
    } else {
      this.router.navigate([`home/contratos`])
    }
    if (plan == 0) {
      this.snack.openSnack("Seleccione el plan", '')
      this.router.navigate(['home/servicios_tv/contratos', contrato])
    } else {
      this.router.navigate(['home/servicios_tv/planes/informacion', plan])
    }
  } 
  miServicio(contrato: number) {
    this.router.navigate(['home/servicios_tv/contratos', contrato])
  }
}
