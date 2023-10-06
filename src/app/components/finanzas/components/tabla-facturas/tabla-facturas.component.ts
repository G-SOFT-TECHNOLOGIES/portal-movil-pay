import { Component, HostListener, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, window } from 'rxjs';
import { Invoice, InvoiceParams } from 'src/app/components/finanzas/interfaces/UsuarioInterfaces';
import { FacturaContratoService } from '../../services/usuario.service';
import { LoadingService } from 'src/app/components/service/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tabla-facturas',
  templateUrl: './tabla-facturas.component.html',
  styleUrls: ['./tabla-facturas.component.css']
})
export class TablaFacturasComponent {

  private facturaServ = inject(FacturaContratoService);
  private loading = inject(LoadingService);
  private dialog = inject(MatDialog);
  private rout = inject(ActivatedRoute)
  dataSource = new MatTableDataSource<Invoice>([]);
  displayedColumns: string[] = [
    'factura',
    'fechaEmision',
    'fechaPago',
    'servicio',
    'facturado',
    'pendiente',
    'pagado',
    'pagar',
    'imprimir',
  ];
  sub !: Subscription
  id: number = 0
  nextPage: number = 1;
  count: number = 1
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    console.log("Init",)
    this.getFacturas()
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getFacturas()
  }


  getFacturas() {
    const params = new InvoiceParams()
    params.page = this.nextPage.toString() ?? '',
      params.contract = this.id.toString() ?? ''
    this.loading.showLoading()
    this.facturaServ.getFacturas(params).then((result) => {
      this.loading.hideLoading()
      this.dataSource = new MatTableDataSource(result.results)
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }


  pagar(monto: string, charged: string, id: number, contract: number) {
    const resultado = Number(monto) - Number(charged)
    const a = Number(resultado.toFixed(2))
    const dialogRef = this.dialog.open(DialogPagarComponent, {
      data: {
        monto: a,
        id,
        contract,
        opcion: ''
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getFacturas()
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe()
  }
}
