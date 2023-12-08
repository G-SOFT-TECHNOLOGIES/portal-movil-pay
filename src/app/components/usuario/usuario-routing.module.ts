import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { CanjearComponent } from './components/canjear/canjear.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
  },
  {
    path: 'canjear/:id',
    component: CanjearComponent,
  },
  { path: 'finanzas/:id', loadChildren: () => import('../finanzas/finanzas.module').then(m => m.FinanzasModule) },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
