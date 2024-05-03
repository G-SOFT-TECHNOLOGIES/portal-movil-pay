import { Component, Input, inject } from '@angular/core';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { UsuarioService } from '../../services/usuario.service';
import { Contract } from '../../interfaces/contractosInterfaces';
import { Router } from '@angular/router';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { ContractDetail } from 'src/app/components/ajustes/interfaces/TicketInterfaces';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFirmaComponent } from '../dialog-firma/dialog-firma.component';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { LoginService } from 'src/app/components/auth/services/login.service';

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
  private login = inject(LoginService)
  gtv: any
  constructor() {
    this.gtv = this.login.contratos$.value.filter((menu) => menu.code == "gtv_contrato").map(data => data)
  }
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
    // console.log(this.contratos.zone, 'date', this.date.getDate(), this.date.getMonth()+1)
    // Carayaca 
    let option: boolean = false
    // if (this.date.getDate() == 30 && this.date.getMonth() +1 == 4 && this.contratos.zone==2) {
    //   option = true
    // }
    if (this.date.getDate() >= 1 && this.date.getMonth() + 1 == 5 && this.contratos.parish == 5) {
      option = true
    }
    // y Naiguata
    if (this.date.getDate() >= 3 && this.date.getMonth() + 1 == 5 && this.contratos.parish == 11) {
      option = true
    }
    // Este
    if (this.date.getDay() >= 6 && this.date.getMonth() + 1 == 5 && this.contratos.zone == 3) {
      option = true
    }
    // Centro
    if (this.date.getDate() >= 13 && this.date.getMonth() + 1 == 5 && this.contratos.zone == 2) {
      option = true
    }
    // Oeste
    if (this.date.getDay() >= 20 && this.date.getMonth() + 1 == 5 && this.contratos.zone == 1) {
      option = true
    }
    return option
  }
  redireccionar(contrato: Contract) {
    const id = contrato.id
    this.router.navigate([`contratos/finanzas`])
  }
  IrDetalle(contrato: number) {
    if (contrato) {

      this.router.navigate(['home/gtv'])
      this.tvservices.setIdContrato(contrato)
      return
    }
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
