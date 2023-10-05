import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path:'',
        redirectTo:'inicio',
        pathMatch:'full'
      },
      { path: 'inicio', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)  },
      { path: 'contratos', loadChildren: () => import('../usuario/usuario.module').then(m => m.UsuarioModule)  },
      { path: 'servicios_tv', loadChildren: () => import('../servicios/servicios.module').then(m => m.ServiciosModule)  },
      { path: 'tickets', loadChildren: () => import('../tickets/tickets.module').then(m => m.TicketsModule)  },
      { path: 'ajustes', loadChildren: () => import('../ajustes/ajustes.module').then(m => m.AjustesModule) },
      // { path: 'finanzas', loadChildren: () => import('../finanzas/finanzas.module').then(m => m.FinanzasModule) },

  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
