import { Component, inject } from '@angular/core';
import { FacturaContratoService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContratoID } from '../../interfaces/UsuarioIDInterface';

@Component({
  selector: 'app-card-datos-pago',
  templateUrl: './card-datos-pago.component.html',
  styleUrls: ['./card-datos-pago.component.css']
})
export class CardDatosPagoComponent {
  private usuarioserv = inject(FacturaContratoService); 
  private rout = inject(ActivatedRoute)
  sub !: Subscription
  id: number = 0
  contrato = new BehaviorSubject<ContratoID | false>(false)
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }
  ngOnInit(): void {
    this.usuarioserv.getContrato(this.id)
    this.usuarioserv.contrato$.subscribe(data => this.contrato.next(data))
  }

}
