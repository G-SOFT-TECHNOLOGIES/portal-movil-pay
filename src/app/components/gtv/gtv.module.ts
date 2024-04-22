import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GtvRoutingModule } from './gtv-routing.module';
import { ContratoGtvComponent } from './components/contrato-gtv/contrato-gtv.component';
import { SuscribirGtvComponent } from './components/suscribir-gtv/suscribir-gtv.component';
import { GtvComponent } from './gtv.component';
import { MaterialExampleModule } from 'src/material.module';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [
    GtvComponent,
    ContratoGtvComponent,
    SuscribirGtvComponent,
  ],
  imports: [
    CommonModule,
    GtvRoutingModule,
    MaterialExampleModule,
    PrimengModule
  ]
})
export class GtvModule { }
