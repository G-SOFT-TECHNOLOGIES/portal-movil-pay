import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialExampleModule } from 'src/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeModule } from '../home/home.module';
import { GraficosComponent } from './components/graficos/graficos.component';
import { InforCardsComponent } from './components/infor-cards/infor-cards.component';
import { PlubicidadComponent } from './components/plubicidad/plubicidad.component';
import { FacturasComponent } from './components/facturas/facturas.component';


@NgModule({
  declarations: [DashboardComponent, GraficosComponent, InforCardsComponent, PlubicidadComponent, FacturasComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule
  ],
  exports:[
    PlubicidadComponent
  ]
})
export class DashboardModule { }
