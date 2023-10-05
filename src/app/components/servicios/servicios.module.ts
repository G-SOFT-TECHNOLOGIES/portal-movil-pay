import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';
import { ListaPlanesComponent } from './components/lista-planes/lista-planes.component';
import { SubscritosComponent } from './components/subscritos/subscritos.component';
import { DatosCuentasComponent } from './components/subscritos/components/datos-cuentas/datos-cuentas.component';
import { InforPlanesAgregadosComponent } from './components/subscritos/components/infor-planes-agregados/infor-planes-agregados.component';
import { ListaPlanesModule } from './components/lista-planes/lista-planes.module';
import { PlubicidadComponent } from '../dashboard/components/plubicidad/plubicidad.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SelectContratosComponent } from './components/select-contratos/select-contratos.component';
import { DialogoPagarComponent } from './components/pagos/dialogo-pagar/dialogo-pagar.component';
import { PagoMovilComponent } from './components/pagos/pago-movil/pago-movil.component';
import { ZelleComponent } from './components/pagos/zelle/zelle.component';
import { TransferenciaComponent } from './components/pagos/transferencia/transferencia.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InformacionCuentaComponent } from './components/subscritos/components/informacion-cuenta/informacion-cuenta.component';
import { NuevaSuscripcionComponent } from './components/nueva-suscripcion/nueva-suscripcion.component';
import { ListaPaquetesComponent } from './components/subscritos/components/lista-paquetes/lista-paquetes.component';
import { DialogEditPanatallaComponent } from './components/subscritos/components/dialog-edit-panatalla/dialog-edit-panatalla.component';
import { DialogEditTvboxComponent } from './components/subscritos/components/dialog-edit-tvbox/dialog-edit-tvbox.component';
import { DialogAddPackageComponent } from './components/subscritos/components/dialog-add-package/dialog-add-package.component';
import { AddListaPaquetesComponent } from './components/subscritos/components/add-lista-paquetes/add-lista-paquetes.component';


@NgModule({
  declarations: [ServiciosComponent, SubscritosComponent, NuevaSuscripcionComponent, DatosCuentasComponent, InforPlanesAgregadosComponent,  SelectContratosComponent, DialogoPagarComponent, PagoMovilComponent, ZelleComponent, TransferenciaComponent, ContratoComponent, InformacionCuentaComponent, ListaPaquetesComponent, DialogEditPanatallaComponent, DialogEditTvboxComponent, DialogAddPackageComponent, AddListaPaquetesComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule,
    DashboardModule
  ],
  exports: [
    
  ]
})
export class ServiciosModule { }
