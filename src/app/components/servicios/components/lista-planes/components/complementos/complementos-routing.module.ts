import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplementosComponent } from './complementos.component';

const routes: Routes = [{
  path: '',
  component:ComplementosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplementosRoutingModule { }
