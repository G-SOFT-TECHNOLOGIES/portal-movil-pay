import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { io } from 'socket.io-client';
import { LoginService } from 'src/app/components/auth/services/login.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { environment } from 'src/environments/enviroments.prod';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';

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
  private login = inject(LoginService);
  private snack = inject(SnackbarService);

  msg = this.login.contratos$.value.filter((menu) => menu.code == "payment_methods_add_contrato").map(data => data)
  @Input() factura: { monto: string; id: number; contract: number; montoDescuento: string; } = {
    monto: '0',
    montoDescuento: '0',
    id: 0,
    contract: 0,
  };
  fechaActual = new Date()
  showTransactionMessage = false;

  urlNotification=environment.API_NOTIFICATION+'/movilPay'
  private socket: any;

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>){
    this.socket = io(this.urlNotification, { transports: ['websocket'] });
    this.socket.on('pagoExitoso', (pago: any) => {
      console.log('====================================');
      console.log(pago);
      console.log('====================================');
      this.dialogRef.close(true);
      this.snack.openSnack(pago.message, 'success');
  
    })
  }

  onAnimationEnd() {
    this.showTransactionMessage = true;
  }

  ngOnDestroy() {
    this.socket.disconnect();
    
  }
  
}
