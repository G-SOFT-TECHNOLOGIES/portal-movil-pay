import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacturaContratoService } from '../../services/usuario.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { CoreService } from 'src/app/components/service/core.service';
import { InfoService } from 'src/app/components/ajustes/services/info.service';
import { DialogoActualizacionesComponent } from 'src/app/components/components/dialogo-actualizaciones/dialogo-actualizaciones.component';
import { LoginService } from 'src/app/components/auth/services/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-zelle',
  templateUrl: './zelle.component.html',
  styleUrls: ['./zelle.component.css'],
})
export class ZelleComponent {
  @HostListener("scroll", ['$event'])
  @HostListener("window:scroll", ['$event'])
  optionZL:boolean= false


  @Input() factura: { monto: string; id: number; contract: number; } = {
    monto: '0',
    id: 0,
    contract: 0,
  };
  private form = inject(FormBuilder);
  private snack = inject(SnackbarService);
  private usuario = inject(FacturaContratoService);
  private core = inject(CoreService);
  private info = inject(InfoService);
  private dialog = inject(MatDialog);
  private login = inject(LoginService)

  msg = this.login.contratos$.value.filter((menu) => menu.code == "payment_methods_add_contrato").map(data => data)

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>) { }
  botonHabilitado = true;
  myForm = this.form.group({
    sender: ['', Validators.required],
    // date: ['', Validators.required],
    // amount: ['', Validators.required],
  });
  registro = new FormGroup({
    name: new FormControl('', Validators.required),
    titular: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  registradas = new FormControl()
  registrar_cuenta: boolean = false;
  listaCuentas: boolean = false
  cuentas: any[] = []
  sinAfiliar: boolean = false
  user = this.core.getUser()
  saldoFavor = this.usuario.saldoFavor
  descuento = 0
  maxDate = new Date()

  ngOnInit(): void {
    this.info.getMethod()
    // this.descuento = Number(this.factura.monto) 
    this.info.datosTablas$.subscribe(data => {
      this.cuentas = data.filter((zelle) => zelle.method === 3).map(data => data)
    })
  }
  openModal() {
    const dialogRef = this.dialog.open(DialogoActualizacionesComponent)
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.closeForm = false
      }
    })
  }
  onSubmit() {
    this.botonHabilitado = false
    const valor = this.myForm.value;
    // if (Number(valor.amount) < Number(this.factura.monto)) {
    //   return this.snack.openSnack(
    //     'El monto enviado debe ser mayor o igual que el de la factura',
    //     'error'
    //   );
    // }
    const payment: any = {
      // bank: null,
      // amount: Number(valor.amount ?? '0'),
      reference: null,
      sender: valor.sender ?? '',
      method: 3,
      // date: this.core.formatearFecha(valor.date ?? ''),
    };
    this.registro.patchValue({
      titular: valor.sender
    })
    this.usuario
      .validarPago(payment)
      .then((result) => {
        this.botonHabilitado = false
        this.snack.openSnack('Pago Validado', 'success');


        const numero = Number(this.calcular) - Number(result.amount_usd);
        const resultado = Number(numero.toFixed(2));
    
        const pago = {
          payment: [
            {
              bank: null,
              method: 3,
              reference: null,
              amount: result.amount_usd,
              sender: valor.sender,
              date: moment(new Date()).format('YYYY-MM-DD')?? '',
              contract: null,
              payment_invoices: [
                {
                  invoice: this.factura.id,
                  amount: resultado < 0 ? this.calcular : result.amount_usd,
                },
              ],
            },
          ],
        };
     //setTimeout(() => {
      this.usuario
      .pagarFatura(pago)
      .then((result) => {
        //this.registrar_cuenta = true
        this.dialogRef.close(true)
        this.snack.openSnack('Pago Registrado con exito', 'success');
        
        //this.msg.length > 0 && !this.registradas.value ? this.openModal() : this.dialogRef.close(true)
        //this.registradas.value ? this.dialogRef.close(true) : '';
      })
      .catch((err) => {
        console.log(err.status)
        this.botonHabilitado = true
        if (err.status === 400) {
          this.snack.openSnack(err.error.message || "", 'error');
          return
        }
      });
 // }, 1500);
      })
      .catch((err) => {
        console.log(err.status)
        this.botonHabilitado = true
        if (err.status === 400) {
          this.snack.openSnack(err.error.message || "", 'error');
          return
        }
      });


  }
  showAccountBalance(item: any) {
    this.listaCuentas = false
    this.myForm.patchValue({
      sender: item.sender
    })
  }
  get calcular() {
    const f = Number(this.factura.monto) - this.usuario.saldoFavor;
    const s = Math.max(f, 0)
    return s
  }
  aggZelle() {
    const valor = this.registro.value
    const body = {
      "sender": valor.titular,
      "email": valor.email,
      "name": valor.name,
      "method": 3,
      "client": this.user.id,
    }
    this.info.postMethod(body)
      .then((result) => {
        this.snack.openSnack('Zelle registrado con exito', 'success')
        this.dialogRef.close(true)
      }).catch((error) => {
          // if (error.status == 400) {
            this.snack.openSnack("Ya existe un registro con este enviante: " + valor.titular, 'error')
            return
          // }
          // this.snack.openSnack(error.error.message, 'error')
          // return
      });
  }
  viewLinkAccount(event: any) {
    let scrollOffset = event.srcElement.children[0].scrollTop;
    console.log("window scroll: ", scrollOffset);
  }
}
