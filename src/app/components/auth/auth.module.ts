import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ButtonModule } from 'primeng/button';
import { PrimengModule } from '../primeng/primeng.module';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    PrimengModule,
    FormsModule,
    PrimengModule,
    MaterialExampleModule,
    FormsModule,
    LoginModule
  ]
})
export class AuthModule { }
