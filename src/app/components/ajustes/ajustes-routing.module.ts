import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjustesComponent } from './ajustes.component';
import { ActualizarClaveComponent } from './components/actualizar-clave/actualizar-clave.component';
import { InfoPagosComponent } from './components/info-pagos/info-pagos.component';
import { EditarCuentaComponent } from './components/editar-cuenta/editar-cuenta.component';

const routes: Routes = [{
  path: '',
  component: AjustesComponent
},
{ path: 'actualizar', component: ActualizarClaveComponent },
{ path: 'editar', component: EditarCuentaComponent },
{ path: 'pagos', component: InfoPagosComponent },
{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesRoutingModule { }
