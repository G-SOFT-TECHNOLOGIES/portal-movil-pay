import { Component, HostListener, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TicketService } from '../ajustes/services/ticket.service';
import { Ticket } from '../ajustes/interfaces/TicketInterfaces';
import { DialogRegistrarTicketsComponent } from './components/dialog-registrar-tickets/dialog-registrar-tickets.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  private dialog = inject(MatDialog);
  private ticket = inject(TicketService);
  show: boolean = false;
  tickets: Ticket[] = [];
  screenWidth: number = 0;
  screenHeight: number = 0;
  sub!: Subscription;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.ticket.getTickets();
    this.sub = this.ticket.datosTablasTickets$.subscribe(data => {
      this.tickets = data

    })
  }


  registrarTicket() {
    const dialog = this.dialog.open(DialogRegistrarTicketsComponent, {
      width: this.screenWidth > 639 ? '30%' : '100%',
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.ticket.getTickets();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
