import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanjesRoutingModule } from './canjes-routing.module';
import { CanjesComponent } from './canjes.component';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';
import { TableCanjesComponent } from './components/table-canjes/table-canjes.component';
import { PdfCanjesComponent } from './components/pdf-canjes/pdf-canjes.component';
import { AswQrCodeModule } from '@asoftwareworld/qrcode';


@NgModule({
  declarations: [
    CanjesComponent,
    TableCanjesComponent,
    PdfCanjesComponent
  ],
  imports: [
    CommonModule,
    CanjesRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
    AswQrCodeModule
  ]
})
export class CanjesModule { }
