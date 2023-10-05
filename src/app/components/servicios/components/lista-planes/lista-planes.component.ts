import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, inject } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ServicoTvService } from '../../services/servico-tv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-planes',
  templateUrl: './lista-planes.component.html',
  styleUrls: ['./lista-planes.component.css']
})
export class ListaPlanesComponent {
  private tvservices = inject(ServicoTvService)
  private router = inject(Router)
  items!: MenuItem[];
  shopping$ = this.tvservices.itemsCount
  subscrito: boolean = false
  lista_paquetes: any = []
  
  visible: boolean = false;
  acumulado: number = 15
  showDialog() {
    this.visible = true;
  }
  verOpciones: boolean = false

  subscription!: Subscription;

  atras() {
    this.tvservices.deleteItems()
    this.router.navigate(['/home/servicios_tv'])

  }


}

