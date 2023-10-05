import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplementosRoutingModule } from './complementos-routing.module';
import { ComplementosComponent } from './complementos.component';
import { HomeModule } from 'src/app/components/home/home.module';
import { PrimengModule } from 'src/app/components/primeng/primeng.module';
import { MaterialExampleModule } from 'src/material.module';
import { ListaPlanesModule } from '../../lista-planes.module';
import { TerminosComponent } from '../terminos/terminos.component';
import {CdkDrag} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ComplementosComponent, TerminosComponent],
  imports: [
    CommonModule,
    ComplementosRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
    CdkDrag, 
    ListaPlanesModule
  ]
})
export class ComplementosModule { }
