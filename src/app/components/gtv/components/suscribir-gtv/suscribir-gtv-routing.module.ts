import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuscribirGtvComponent } from './suscribir-gtv.component';

const routes: Routes = [
  {path:'',
    component:SuscribirGtvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuscribirGtvRoutingModule { }
