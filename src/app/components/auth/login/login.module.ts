import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { MaterialExampleModule } from 'src/material.module';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { DialogRecuperarComponent } from '../dialog-recuperar/dialog-recuperar.component';
import { DialogActivarComponent } from '../dialog-activar/dialog-activar.component';


@NgModule({
  declarations: [LoginComponent, FormLoginComponent, DialogRecuperarComponent, DialogActivarComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PrimengModule,
    MaterialExampleModule,
    FormsModule,

  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
