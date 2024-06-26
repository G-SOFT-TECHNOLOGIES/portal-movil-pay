import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  //     },
  //     {
  //       path: 'auth',
  //       loadChildren: () => import('./auth.module').then(m => m.AuthModule)
  //     },
  //     {
  //       path: 'registrer',
  //       loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  //     },

  //   ]
  },
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
export class AuthRoutingModule { }
