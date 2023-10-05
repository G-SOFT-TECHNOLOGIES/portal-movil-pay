import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';
import { CardUserComponent } from './components/card-user/card-user.component';


@NgModule({
  declarations: [UsuarioComponent, CardUserComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule
  ]
})
export class UsuarioModule { }
