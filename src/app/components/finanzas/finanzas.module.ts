import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';
import { FinanzasComponent } from './finanzas.component';
import { TablaFacturasComponent } from './components/tabla-facturas/tabla-facturas.component';
import { DialogPagarComponent } from './components/dialog-pagar/dialog-pagar.component';
import { ZelleComponent } from './components/zelle/zelle.component';
import { PagoMovilComponent } from './components/pago-movil/pago-movil.component';
import { CardDatosPagoComponent } from './components/card-datos-pago/card-datos-pago.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import { PagoMovilQrComponent } from './components/pago-movil-qr/pago-movil-qr.component';


@NgModule({
  declarations: [FinanzasComponent, TablaFacturasComponent, DialogPagarComponent, ZelleComponent, PagoMovilComponent, CardDatosPagoComponent, TransferenciaComponent, PagoMovilQrComponent],
  imports: [
    CommonModule,
    FinanzasRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule
  ]
})
export class FinanzasModule { }
