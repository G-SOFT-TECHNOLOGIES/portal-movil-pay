import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';

import { ListaPlanesRoutingModule } from './lista-planes-routing.module';
import { ListaPlanesComponent } from './lista-planes.component';
import { HomeModule } from 'src/app/components/home/home.module';
import { PrimengModule } from 'src/app/components/primeng/primeng.module';
import { MaterialExampleModule } from 'src/material.module';
import { PlanesComponent } from './components/planes/planes.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { FinalizarComponent } from './components/finalizar/finalizar.component';
import { DialogoResumenCuentaComponent } from './components/dialogo-resumen-cuenta/dialogo-resumen-cuenta.component';
import { ResumenCuentaComponent } from './components/resumen-cuenta/resumen-cuenta.component';
import { DetallesPlanComponent } from './components/detalles-plan/detalles-plan.component';
import { ServiciosModule } from '../../servicios.module';
import { DialogoDetallePaqueteComponent } from './components/dialogo-detalle-paquete/dialogo-detalle-paquete.component';
import { DatosValidadosComponent } from './components/datos-validados/datos-validados.component';


@NgModule({
  declarations: [ListaPlanesComponent, PlanesComponent, FinalizarComponent, DialogoResumenCuentaComponent, ResumenCuentaComponent, DetallesPlanComponent, DialogoDetallePaqueteComponent, DatosValidadosComponent, ],
  imports: [
    CommonModule,
    ListaPlanesRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
    ServiciosModule
  ],
  exports: [ResumenCuentaComponent,],
  
  providers: [MessageService]

})
export class ListaPlanesModule { }
