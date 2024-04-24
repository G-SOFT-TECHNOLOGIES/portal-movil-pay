import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuscribirGtvRoutingModule } from './suscribir-gtv-routing.module';
import { SuscribirGtvComponent } from './suscribir-gtv.component';
import { MaterialExampleModule } from 'src/material.module';
import { PackageGtvComponent } from './components/package-gtv/package-gtv.component';
import { ComplementosModule } from 'src/app/components/servicios/components/lista-planes/components/complementos/complementos.module';


@NgModule({
  declarations: [SuscribirGtvComponent, PackageGtvComponent],
  imports: [
    CommonModule,
    SuscribirGtvRoutingModule,
    MaterialExampleModule,
    ComplementosModule
  ]
})
export class SuscribirGtvModule { }
