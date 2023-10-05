import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPlanesComponent } from './lista-planes.component';
import { FinalizarComponent } from './components/finalizar/finalizar.component';
import { DetallesPlanComponent } from './components/detalles-plan/detalles-plan.component';
import { DatosValidadosComponent } from './components/datos-validados/datos-validados.component';

const routes: Routes = [
  {
    path: '',
    component: ListaPlanesComponent,
    children: [
      { path: "informacion/:id", component: DetallesPlanComponent },
      { path: "detalles/:id", component: FinalizarComponent },
      { path: "finalizar/:id", loadChildren: () => import('./components/complementos/complementos.module').then(m => m.ComplementosModule) },
      { path: "suscripcion", component: DatosValidadosComponent },
      { path: "", redirectTo: "planes", pathMatch: "full" }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaPlanesRoutingModule { }
