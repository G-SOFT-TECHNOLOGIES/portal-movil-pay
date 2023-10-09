import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogoutGuard } from './components/auth/guards/is-logout.guard';
import { IsLoginGuard } from './components/auth/guards/is-login.guard';

const routes: Routes = [{
  path: '',
  redirectTo: '',
  pathMatch: 'full'
},
{
  path: '',
  loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule),
  canActivate:[IsLogoutGuard]
},
{
  path: 'home',
  loadChildren: () => import('../app/components/home/home.module').then(m => m.HomeModule),
  canActivate:[IsLoginGuard]
},
{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
