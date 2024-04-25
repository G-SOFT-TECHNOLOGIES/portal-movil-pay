import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuscribirGtvRoutingModule } from './suscribir-gtv-routing.module';
import { SuscribirGtvComponent } from './suscribir-gtv.component';
import { MaterialExampleModule } from 'src/material.module';
import { PackageGtvComponent } from './components/package-gtv/package-gtv.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { PrimengModule } from 'src/app/components/primeng/primeng.module';


@NgModule({
  declarations: [SuscribirGtvComponent, PackageGtvComponent,TerminosComponent],
  imports: [
    CommonModule,
    SuscribirGtvRoutingModule,
    MaterialExampleModule,
    PrimengModule
  ]
})
export class SuscribirGtvModule { }
