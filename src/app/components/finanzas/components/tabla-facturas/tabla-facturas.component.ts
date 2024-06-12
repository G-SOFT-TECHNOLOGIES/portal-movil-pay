import { Component, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Invoice, InvoiceParams } from 'src/app/components/finanzas/interfaces/UsuarioInterfaces';
import { FacturaContratoService } from '../../services/usuario.service';
import { LoadingService } from 'src/app/components/service/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { LoginService } from 'src/app/components/auth/services/login.service';

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
  private login = inject(LoginService)

  dataSource = new MatTableDataSource<Invoice>([]);
  factura: Invoice[] = []
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
  mode_mobile: boolean = window.innerWidth > 639 ? false : true
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }

  ngOnInit(): void {
    this.getFacturas()
  }
  nextPageIndex(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.getFacturas()
  }


  getFacturas() {
    const params = new InvoiceParams()
    params.page = this.nextPage.toString() ?? '',
      // params.contract = this.id.toString() ?? ''
      params.contract =  '18823'
    this.loading.showLoading()
    this.facturaServ.getFacturas(params).then((result) => {
      this.loading.hideLoading()
      this.factura = result.results
      this.dataSource = new MatTableDataSource(result.results)
      this.count = result.count
    }).catch((err) => {
      this.loading.hideLoading()
    });
  }


  pagar(monto: string, charged: string, id: number, contract: number, montoDescuento: number) {
    const resultado = Number(monto) - Number(charged)
    const descuento = Number(montoDescuento) - Number(charged)
    const a = Number(resultado.toFixed(2))
    const d = Number(descuento.toFixed(2))
    const dialogRef = this.dialog.open(DialogPagarComponent, {
      width: '520px',
      data: {
        monto: a,
        id,
        contract,
        opcion: '',
        montoDescuento: d,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload()
        // this.getFacturas()
      }
    })
  }
  calcular(amount:string,charged:string, amount_discount:number):number{
    const a =Number(amount) 
    const c =Number(charged)    
    return Number((a - c)- amount_discount)
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
