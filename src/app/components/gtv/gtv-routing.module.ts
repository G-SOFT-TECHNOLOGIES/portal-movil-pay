import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GtvComponent } from './gtv.component';
import { ContratoGtvComponent } from './components/contrato-gtv/contrato-gtv.component';
import { SuscribirGtvComponent } from './components/suscribir-gtv/suscribir-gtv.component';
import { CuentasGtvComponent } from './components/cuentas-gtv/cuentas-gtv.component';

const routes: Routes = [
  {
    path: '',
    component: GtvComponent
  },
  {
    path: 'subscribete/:id',
    loadChildren: () => import('./components/suscribir-gtv/suscribir-gtv.module').then(m=> m.SuscribirGtvModule)
  },
  {
    path: 'cuentas',
    component: CuentasGtvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GtvRoutingModule { }
