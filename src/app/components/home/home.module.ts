import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HomeComponent } from './home.component';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidebarModule } from 'primeng/sidebar';
import { LoadingComponent } from './loading/loading.component';
import { AjustesComponent } from '../ajustes/ajustes.component';
import { FinanzasComponent } from '../finanzas/finanzas.component';
import { ServiciosComponent } from '../servicios/servicios.component';
import { TicketsComponent } from '../tickets/tickets.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PipeModule } from "../pipes/pipe.module";
import { FacturasComponent } from '../dashboard/components/facturas/facturas.component';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
    declarations: [HomeComponent, MenuComponent, LoadingComponent, EncabezadoComponent, ConfirmComponent
    ],
    exports: [
        MenuComponent, LoadingComponent, EncabezadoComponent, ConfirmComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        PrimengModule,
        FormsModule,
        MaterialExampleModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        SidebarModule,
        PipeModule
    ]
})
export class HomeModule { }
