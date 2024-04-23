import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuscribirGtvRoutingModule } from './suscribir-gtv-routing.module';
import { SuscribirGtvComponent } from './suscribir-gtv.component';
import { MaterialExampleModule } from 'src/material.module';
import { PackageGtvComponent } from './components/package-gtv/package-gtv.component';


@NgModule({
  declarations: [SuscribirGtvComponent, PackageGtvComponent],
  imports: [
    CommonModule,
    SuscribirGtvRoutingModule,
    MaterialExampleModule
  ]
})
export class SuscribirGtvModule { }
