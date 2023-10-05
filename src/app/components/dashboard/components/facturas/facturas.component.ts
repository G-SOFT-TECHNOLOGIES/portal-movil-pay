import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  panelOpenState = false;
  dataSource = new MatTableDataSource<any>([]);

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
}
