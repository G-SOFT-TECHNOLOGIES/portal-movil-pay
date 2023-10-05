import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLogoutGuard } from './components/auth/guards/is-logout.guard';
import { IsLoginGuard } from './components/auth/guards/is-login.guard';

const routes: Routes = [{
  path: '',
  redirectTo: 'auth/login',
  pathMatch: 'full'
},
{
  path: 'auth',
  loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
  canActivate:[IsLogoutGuard]
},
{
  path: 'home',
  loadChildren: () => import('../app/components/home/home.module').then(m => m.HomeModule),
  canActivate:[IsLoginGuard]
},
{
  path: '**',
  redirectTo: 'auth/login',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
