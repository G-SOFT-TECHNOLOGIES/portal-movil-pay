import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './servicios.component';
import { NuevaSuscripcionComponent } from './components/nueva-suscripcion/nueva-suscripcion.component';
import { ContratoComponent } from './components/contrato/contrato.component';

const routes: Routes = [{
  path: '',
  component: ServiciosComponent,
},
{
  path: 'planes',
  loadChildren: () => import('../servicios/components/lista-planes/lista-planes.module').then(m => m.ListaPlanesModule)
},
{ path: "subscripcion/:id", component: NuevaSuscripcionComponent },
{ path: "contratos/:id", component: ContratoComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
