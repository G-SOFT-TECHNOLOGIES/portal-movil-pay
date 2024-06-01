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
import { guide } from '../../services/gtv-guide';

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
  guide = guide.gtv
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
    }).catch((error) => {
      console.log(error)

    })
  }
  // permisosFechaZona(): Boolean {
  //   // Carayaca 
  //   let option: boolean = false
  //   let nodo = this.contract.filter((cont) => cont.service_type.id == 1).map(cont => cont.nodo)
  //   if (nodo[0] !== null) {
  //     let filter = this.guide
  //       .filter((gtv) => gtv.day <= this.date.getDate() && gtv.node === nodo[0])
  //       .map((gtv) => gtv);
  //       option = filter.length > 0
  //   }
  //   return option
  // }
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
