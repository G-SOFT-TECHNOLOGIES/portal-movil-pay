import { DialogRegistrarPmComponent } from './components/dialog-registrar-pm/dialog-registrar-pm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesRoutingModule } from './ajustes-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';
import { AjustesComponent } from './ajustes.component';
import { EditarCuentaComponent } from './components/editar-cuenta/editar-cuenta.component';
import { ActualizarClaveComponent } from './components/actualizar-clave/actualizar-clave.component';
import { InfoPagosComponent } from './components/info-pagos/info-pagos.component';
import { FormsModule } from '@angular/forms';
import { DialogRegistrarZelleComponent } from './components/dialog-registrar-zelle/dialog-registrar-zelle.component';
import { DialogRegistrarTransferenciaComponent } from './components/dialog-registrar-transferencia/dialog-registrar-transferencia.component';


@NgModule({
  declarations: [AjustesComponent, EditarCuentaComponent, ActualizarClaveComponent, InfoPagosComponent, DialogRegistrarZelleComponent, DialogRegistrarPmComponent, DialogRegistrarTransferenciaComponent],
  imports: [
    CommonModule,
    AjustesRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
    FormsModule
  ]
})
export class AjustesModule { }
