import { Component, inject } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/home/confirm/confirm.component';
import { Informacion } from '../../interfaces/InfoInterfaces';
import { DialogRegistrarPmComponent } from '../dialog-registrar-pm/dialog-registrar-pm.component';
import { DialogRegistrarZelleComponent } from '../dialog-registrar-zelle/dialog-registrar-zelle.component';
import { PageEvent } from '@angular/material/paginator';
import { DialogRegistrarTransferenciaComponent } from '../dialog-registrar-transferencia/dialog-registrar-transferencia.component';

@Component({
  selector: 'app-info-pagos',
  templateUrl: './info-pagos.component.html',
  styleUrls: ['./info-pagos.component.css']
})
export class InfoPagosComponent {
  private info = inject(InfoService);
  private dialog = inject(MatDialog);
  data: Informacion[] = [];
  count: number = 0
  nextPageIndex: number = 1;
  constructor() { }

  ngOnInit(): void {
    this.info.getMethod()
    this.info.datosTablas$.subscribe(data => {
      this.data = data
    })
  }
  registrarPM() {
    const dialog = this.dialog.open(DialogRegistrarPmComponent, {
      width: window.innerWidth > 639 ? '30%' : '100%',
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.info.getMethod();
      }
    });
  }
  registrarZelle() {
    const dialog = this.dialog.open(DialogRegistrarZelleComponent, {
      width: window.innerWidth > 639 ? '30%' : '100%',
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.info.getMethod();
      }
    });
  }

  registrarTransferencia() {
    const dialog = this.dialog.open(DialogRegistrarTransferenciaComponent, {
      width: window.innerWidth > 639 ? '30%' : '100%',
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

}
