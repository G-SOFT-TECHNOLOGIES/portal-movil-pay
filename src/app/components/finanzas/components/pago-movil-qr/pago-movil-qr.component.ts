import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/components/auth/services/login.service';

@Component({
  selector: 'app-pago-movil-qr',
  templateUrl: './pago-movil-qr.component.html',
  styleUrls: ['./pago-movil-qr.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PagoMovilQrComponent {
  private dialog = inject(MatDialog);
  private login = inject(LoginService)
  msg = this.login.contratos$.value.filter((menu) => menu.code == "payment_methods_add_contrato").map(data => data)
  @Input() factura: { monto: string; id: number; contract: number; montoDescuento: string; } = {
    monto: '0',
    montoDescuento: '0',
    id: 0,
    contract: 0,
  };
  fechaActual = new Date()
  showTransactionMessage = false;

  onAnimationEnd() {
    this.showTransactionMessage = true;
  }
  
}
