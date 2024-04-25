import { Component, Input, inject } from '@angular/core';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { UsuarioService } from '../../services/usuario.service';
import { Contract } from '../../interfaces/contractosInterfaces';
import { Router } from '@angular/router';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { ContractDetailPackage } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';
import { ContractDetail } from 'src/app/components/ajustes/interfaces/TicketInterfaces';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFirmaComponent } from '../dialog-firma/dialog-firma.component';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';

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
  private dialog = inject(MatDialog);
  private usuario = inject(UsuarioService);
  private fuser = inject(FacturaContratoService)

  contract: ContractDetail | any
  date = new Date()
  ngOnInit(): void {
    this.tvservices.getContratoTV(this.contratos.id).then((value) => {
      this.contract = value.contract_detail
    }).catch((error) => {
      console.log(error)

    })
  }
  permisosFechaZona(): Boolean {
    console.log(this.contratos.zone, 'date')
    console.log(this.date.getMonth(), 'date', this.date.getDate())
    // Carayaca
    let option: boolean =false
    if (this.date.getDay() == 1 || this.date.getDay() == 3 && this.date.getMonth() +1 == 5 && this.contratos.zone==9) {
      option = true
    }
    // Centro
    if (this.date.getDay() == 5 && this.date.getMonth()+1 == 5 && this.contratos.zone==2) {
      option = true
    }
      // Este
    if (this.date.getDay() == 8 && this.date.getMonth()+1 == 5 && this.contratos.zone==3) {
      option = true
    }
      // Oeste
      if (this.date.getDay() == 10 && this.date.getMonth()+1 == 5 && this.contratos.zone==1) {
        option = true
      }
    return option
  }
  redireccionar(contrato: Contract) {
    const id = contrato.id
    this.router.navigate([`contratos/finanzas`])
  }
  IrDetalle(contrato: number) {
    let plan = 0
    if (contrato) {
      this.snack.openSnack("Seleccione el plan", '')
      this.router.navigate(['home/gtv'])
      this.tvservices.setIdContrato(contrato)
      return
    }

    // this.router.navigate(['home/servicios_tv/planes/informacion', plan])
    // return
    // this.tvservices.id_servicestv$.subscribe(data => plan = data)
    // if (contrato) {
    //   this.tvservices.setIdContrato(contrato)
    // } else {
    //   this.router.navigate([`home/contratos`])
    // }
    // if (plan == 0) {
    //   this.snack.openSnack("Seleccione el plan", '')
    //   this.router.navigate(['home/servicios_tv/contratos', contrato])
    // } else {
    //   this.router.navigate(['home/servicios_tv/planes/informacion', plan])
    // }
  }
  miServicio(contrato: number) {
    this.router.navigate(['home/gtv'])
    this.tvservices.setIdContrato(contrato)
  }

  abrirFirma() {
    const dialog = this.dialog.open(DialogFirmaComponent, {
      data: this.contratos.id,
      width: window.innerWidth > 639 ? 'auto' : 'auto',
      height: window.innerWidth > 639 ? 'auto' : 'auto'
    })
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.usuario.getContratos()
      }
    })
  }

  calculo(monto: number) {
    return this.fuser.calcularBs(monto)
  }
}
