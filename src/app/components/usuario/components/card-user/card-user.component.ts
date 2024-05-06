import { Component, Input, inject } from '@angular/core';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFirmaComponent } from '../dialog-firma/dialog-firma.component';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { LoginService } from 'src/app/components/auth/services/login.service';
import { ContractDetail, ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent {
  @Input() contratos: ContratoID | any
  private router = inject(Router)
  private tvservices = inject(ServicoTvService);
  private snack = inject(SnackbarService);
  private dialog = inject(MatDialog);
  private usuario = inject(UsuarioService);
  private fuser = inject(FacturaContratoService)
  private login = inject(LoginService)
  gtv: any
  permiso: boolean | any
  constructor() {
    this.gtv = this.login.contratos$.value.filter((menu) => menu.code == "gtv_contrato").map(data => data)
  }
  contract: ContractDetail[] = []
  date = new Date()
  ngOnInit(): void {
    this.tvservices.getContratoTV(this.contratos.id).then((value) => {
      this.contract = value.contract_detail
      this.permiso = this.permisosFechaZona()
    }).catch((error) => {
      console.log(error)

    })
  }
  permisosFechaZona(): Boolean {
    // console.log(this.contratos.zone, 'date', this.date.getDate(), this.date.getMonth()+1)
    // Carayaca 
    let option: boolean = false
    let nodo = this.contract.filter((cont) => cont.service_type.id == 1).map(cont => cont.nodo)
    if (this.date.getDate() >= 1 && this.date.getMonth() + 1 == 5 && this.contratos.parish == 5) {
      option = true
    }
    // y Naiguata
    if (this.date.getDate() >= 3 && this.date.getMonth() + 1 == 5 && this.contratos.parish == 11) {
      option = true
    }
    // Este
    if (this.date.getDate() >= 6 && this.date.getMonth() + 1 == 5 && nodo[0] == 9 || nodo[0] == 14 || nodo[0] == 15 || nodo[0] == 16 || nodo[0] == 18 || nodo[0] == 19 || nodo[0] == 22) {
      option = true
    }
    // Centro
    if (this.date.getDate() >=13 && this.date.getMonth() + 1 == 5 && this.contratos.zone == 2) {
      option = true
    }
    // Oeste
    if (this.date.getDate() >= 20 && this.date.getMonth() + 1 == 5 && this.contratos.zone == 1) {
      option = true
    }
    return option
  }
  redireccionar(contrato: ContratoID) {
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
