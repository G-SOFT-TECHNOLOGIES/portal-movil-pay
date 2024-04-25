import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';



@NgModule({
  declarations: [ServiciosComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
  ],
  exports: [
    
  ]
})
export class ServiciosModule { }
