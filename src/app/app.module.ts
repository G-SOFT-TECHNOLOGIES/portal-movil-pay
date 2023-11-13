import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrimengModule } from './components/primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { HeadersInterceptor } from './components/helper/headers.interceptor';
import { TokenInvalidInterceptor } from './components/helper/token-invalid.interceptor';
import { DialogConfirmComponent } from './components/components/dialog-confirm/dialog-confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    MaterialExampleModule,
 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInvalidInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
