import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GtvRoutingModule } from './gtv-routing.module';
import { ContratoGtvComponent } from './components/contrato-gtv/contrato-gtv.component';
import { SuscribirGtvComponent } from './components/suscribir-gtv/suscribir-gtv.component';
import { GtvComponent } from './gtv.component';
import { MaterialExampleModule } from 'src/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeGtvComponent } from './components/home-gtv/home-gtv.component';
import { DialogDetallePlanComponent } from './components/dialog-detalle-plan/dialog-detalle-plan.component';
import { CuentasGtvComponent } from './components/cuentas-gtv/cuentas-gtv.component';


@NgModule({
  declarations: [
    GtvComponent,
    ContratoGtvComponent,
    HomeGtvComponent,
    DialogDetallePlanComponent,
    CuentasGtvComponent,
  ],
  imports: [
    CommonModule,
    GtvRoutingModule,
    MaterialExampleModule,
    PrimengModule
  ]
})
export class GtvModule { }
