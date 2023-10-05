import { Component, Input, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilesTicket } from 'src/app/components/ajustes/interfaces/TicketInterfaces';
import { TicketService } from 'src/app/components/ajustes/services/ticket.service';
import { CoreService } from 'src/app/components/service/core.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent {
  @Input() ticket: any
  private ticketservices = inject(TicketService)
  private core = inject(CoreService)
  isLinear = false;
  isLinear2 = false;
  imageObject: any = [];
  fileObject: any = [];
  timeLine = new BehaviorSubject<any | false>(false);
  images: any[] | undefined;
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    this.images = this.imageObject
  }
  getDetailsTickets(id: number) {
    let count = 0;

    this.ticketservices.getDetalleTicket(id)
      .then((value) => {
        value.files_tickets.map((e: FilesTicket) => {
          if (e.extension == 'mp4') {
            count++;
            this.imageObject.push({ video: e.file });
          } else if (e.extension == 'jpg' || e.extension == 'png' || e.extension == 'jpeg') {
            count++;
            this.imageObject.push({ image: e.file, thumbImage: e.file }
            );
          } else {
            const name = e.file.substring(e.file.indexOf('ticket/ticket/') + 'ticket/ticket/'.length);
            this.fileObject.push({ file: e.file, name: name });
          }
        });
        console.log(this.imageObject)
        this.images = this.imageObject
      }).catch((err) => {
        console.log(err)
      })

    this.ticketservices.getTicketTimeLine(id).then((res) => {
      this.timeLine.next([])
      let body: any[] = [];
      res.history.map((e: any) => {
        body.push({
          label: this.core.formatearFecha(e.history_date),
          description: e.history_change_reason,
          fecha: e.history_date,
        });
      });
      this.timeLine.next(body)
    });

  }

  resetData() {
    this.imageObject = [];
    this.fileObject = [];
  }
}
