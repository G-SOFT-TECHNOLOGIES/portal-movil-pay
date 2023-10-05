import { Component, Input, inject } from '@angular/core';
import { TicketService } from 'src/app/components/ajustes/services/ticket.service';
import { LoadingService } from 'src/app/components/service/loading.service';
import { Contract } from 'src/app/components/usuario/interfaces/contractosInterfaces';
import { UsuarioService } from 'src/app/components/usuario/services/usuario.service';

@Component({
  selector: 'app-infor-cards',
  templateUrl: './infor-cards.component.html',
  styleUrls: ['./infor-cards.component.css']
})
export class InforCardsComponent {
  private usuario = inject(UsuarioService)
  private loader = inject(LoadingService)
  private ticketservices = inject(TicketService)
  @Input() contratos: Contract[] = []
  infor_cards: any[] = []
  deuda: number = 0
  acumulado: number = 0
  tickets: any;
  ngOnInit() {
    this.deuda = this.contratos.map(c => c.debt).reduce((acc, value) => acc + value, 0);
    this.acumulado = this.contratos.map(c => c.balance).reduce((acc, value) => acc + value, 0);
    this.ticketservices.getTickets();
    this.ticketservices.datosTablasTickets$.subscribe(data => {
      this.tickets = data.filter((status) => status.status == 38).map((ticket) => ticket)
    })
   
  }
}
