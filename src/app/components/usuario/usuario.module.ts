import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';
import { CardUserComponent } from './components/card-user/card-user.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PlubicidadComponent } from '../dashboard/components/plubicidad/plubicidad.component';
import { DialogFirmaComponent } from './components/dialog-firma/dialog-firma.component';
import { CanjearComponent } from './components/canjear/canjear.component';
import { ListCampaingComponent } from './components/list-campaing/list-campaing.component';
import { DialogoResumenCuponesComponent } from './components/dialogo-resumen-cupones/dialogo-resumen-cupones.component';


@NgModule({
  declarations: [UsuarioComponent, CardUserComponent, DialogFirmaComponent, CanjearComponent, ListCampaingComponent, DialogoResumenCuponesComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
    DashboardModule
  ]
})
export class UsuarioModule { }
