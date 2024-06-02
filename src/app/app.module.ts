import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { PrimengModule } from './components/primeng/primeng.module';
// Components
import { AppComponent } from './app.component';
import { DialogConfirmComponent } from './components/components/dialog-confirm/dialog-confirm.component';
import { DialogoActualizacionesComponent } from './components/components/dialogo-actualizaciones/dialogo-actualizaciones.component';
import { DialogoPasosAfiliacionComponent } from './components/components/dialogo-pasos-afiliacion/dialogo-pasos-afiliacion.component';
import { DialogoAlertasGlobalesComponent } from './components/components/dialogo-alertas-globales/dialogo-alertas-globales.component';
import { DialogoGtvPasosComponent } from './components/components/dialogo-gtv-pasos/dialogo-gtv-pasos.component';
// Interceptors
import { TokenInvalidInterceptor } from './components/helper/token-invalid.interceptor';
import { HeadersInterceptor } from './components/helper/headers.interceptor';
// Utils
import { MY_FORMATS, locale } from './components/utils/DateFormater.util';


@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmComponent,
    DialogoActualizacionesComponent,
    DialogoPasosAfiliacionComponent,
    DialogoAlertasGlobalesComponent,
    DialogoGtvPasosComponent,
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter
    },
    { provide: MAT_DATE_LOCALE, useValue: locale },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
