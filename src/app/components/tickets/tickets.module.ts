import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { MaterialExampleModule } from 'src/material.module';
import { HomeModule } from '../home/home.module';
import { PrimengModule } from '../primeng/primeng.module';
import { TicketsComponent } from './tickets.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { DialogRegistrarTicketsComponent } from './components/dialog-registrar-tickets/dialog-registrar-tickets.component';


@NgModule({
  declarations: [TicketsComponent, ListTicketsComponent, DialogRegistrarTicketsComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MaterialExampleModule,
    PrimengModule,
    HomeModule
  ]
})
export class TicketsModule { }
