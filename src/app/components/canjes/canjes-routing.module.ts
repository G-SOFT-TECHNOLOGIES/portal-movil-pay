import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanjesComponent } from './canjes.component';

const routes: Routes = [{
  path:'',
  component:CanjesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanjesRoutingModule { }
