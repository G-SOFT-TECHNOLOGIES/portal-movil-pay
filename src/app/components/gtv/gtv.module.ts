import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GtvRoutingModule } from './gtv-routing.module';
import { ContratoGtvComponent } from './components/contrato-gtv/contrato-gtv.component';
import { GtvComponent } from './gtv.component';
import { MaterialExampleModule } from 'src/material.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeGtvComponent } from './components/home-gtv/home-gtv.component';
import { DialogDetallePlanComponent } from './components/dialog-detalle-plan/dialog-detalle-plan.component';
import { CuentasGtvComponent } from './components/cuentas-gtv/cuentas-gtv.component';
import { InformacionCuentaComponent } from './components/contrato-gtv/components/informacion-cuenta/informacion-cuenta.component';
import { DialogEditPanatallaComponent } from './components/contrato-gtv/components/dialog-edit-panatalla/dialog-edit-panatalla.component';
import { HomeModule } from '../home/home.module';
import { ListaPaquetesComponent } from './components/contrato-gtv/components/lista-paquetes/lista-paquetes.component';
import { AddListaPaquetesComponent } from './components/contrato-gtv/components/add-lista-paquetes/add-lista-paquetes.component';
import { InforPlanesAgregadosComponent } from './components/contrato-gtv/components/infor-planes-agregados/infor-planes-agregados.component';
import { DialogDetallePaquetesGtvComponent } from './components/dialog-detalle-paquetes-gtv/dialog-detalle-paquetes-gtv.component';


@NgModule({
  declarations: [
    GtvComponent,
    ContratoGtvComponent,
    HomeGtvComponent,
    DialogDetallePlanComponent,
    CuentasGtvComponent,
    InformacionCuentaComponent,
    DialogEditPanatallaComponent,
    ListaPaquetesComponent,
    AddListaPaquetesComponent,
    InforPlanesAgregadosComponent,
    DialogDetallePaquetesGtvComponent
  ],
  imports: [
    CommonModule,
    GtvRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
  ]
})
export class GtvModule { }
