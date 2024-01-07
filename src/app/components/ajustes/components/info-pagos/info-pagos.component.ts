import { Component, inject } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/home/confirm/confirm.component';
import { Informacion } from '../../interfaces/InfoInterfaces';
import { DialogRegistrarPmComponent } from '../dialog-registrar-pm/dialog-registrar-pm.component';
import { DialogRegistrarZelleComponent } from '../dialog-registrar-zelle/dialog-registrar-zelle.component';
import { PageEvent } from '@angular/material/paginator';
import { DialogRegistrarTransferenciaComponent } from '../dialog-registrar-transferencia/dialog-registrar-transferencia.component';
import { DialogoActualizacionesComponent } from 'src/app/components/components/dialogo-actualizaciones/dialogo-actualizaciones.component';
import { DialogoPagarComponent } from 'src/app/components/servicios/components/pagos/dialogo-pagar/dialogo-pagar.component';
import { DialogoPasosAfiliacionComponent } from 'src/app/components/components/dialogo-pasos-afiliacion/dialogo-pasos-afiliacion.component';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { LoadingService } from 'src/app/components/service/loading.service';
import { LoginService } from 'src/app/components/auth/services/login.service';

@Component({
  selector: 'app-info-pagos',
  templateUrl: './info-pagos.component.html',
  styleUrls: ['./info-pagos.component.css']
})
export class InfoPagosComponent {
  private info = inject(InfoService);
  private dialog = inject(MatDialog);
  private snack = inject(SnackbarService)
  private loader = inject(LoadingService)
  private login = inject(LoginService)

  data: Informacion[] = [];
  count: number = 0
  nextPageIndex: number = 1;
  constructor() { }

  ngOnInit(): void {
    this.info.getMethod()
    this.info.datosTablas$.subscribe(data => {
      this.data = data
    })
   this.login.getDataAjustes.length > 0 ? this.openAlerts(): ''
  }
  openAlerts(){
    const dialogRef = this.dialog.open(DialogoPasosAfiliacionComponent, {
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.info.getMethod()
        this.login.getAlerts()
      }
    })
  }
  registrarPM(data: any) {
    const dialog = this.dialog.open(DialogRegistrarPmComponent, {
      width: window.innerWidth > 639 ? '30%' : '100%',
      data
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.info.getMethod();
      }
    });
  }
  registrarZelle(data: any) {
    const dialog = this.dialog.open(DialogRegistrarZelleComponent, {
      width: window.innerWidth > 639 ? '30%' : '100%',
      data
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.info.getMethod();
      }
    });
  }

  registrarTransferencia(data: any) {
    const dialog = this.dialog.open(DialogRegistrarTransferenciaComponent, {
      width: window.innerWidth > 639 ? '30%' : '100%',
      data
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.info.getMethod();
      }
    });
  }
  confirm(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { message: '¿Estas Seguro que deseas Eliminar?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.info.deleteMethod(id)
      }
    });
  }
  onPageChange(event: PageEvent) {
    this.nextPageIndex = event.pageIndex + 1;
    // this.getrutasAll()
  }

  confirmPaymentsAuth(data: Informacion) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { message: `¿Estas seguro que deseas ${data.status ? 'Desactivar' : 'Activar'} el proceso de pago automático ?` },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let body = {
          status: !data.status
        }
        console.log(body)
        this.info.patchMethodId(body, data.id).then((res) => {
          console.log(res)
          this.info.getMethod()
          this.snack.openSnack("Actualización exitosa", '')
        }).catch((error) => {
          console.log(error)
        })
      }
      this.info.getMethod()
    });
  }
}
