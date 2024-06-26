import { Component, inject, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacturaContratoService } from '../../services/usuario.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { CoreService } from 'src/app/components/service/core.service';
import { InfoService } from 'src/app/components/ajustes/services/info.service';
import { DialogConfirmComponent } from 'src/app/components/components/dialog-confirm/dialog-confirm.component';
import { DialogoActualizacionesComponent } from 'src/app/components/components/dialogo-actualizaciones/dialogo-actualizaciones.component';
import { LoginService } from 'src/app/components/auth/services/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pago-movil',
  templateUrl: './pago-movil.component.html',
  styleUrls: ['./pago-movil.component.css'],
})
export class PagoMovilComponent {
  private dialog = inject(MatDialog);
  private login = inject(LoginService)
  msg = this.login.contratos$.value.filter((menu) => menu.code == "payment_methods_add_contrato").map(data => data)
  @Input() factura: { monto: string; id: number; contract: number;  } = {
    monto: '0',
    id: 0,
    contract: 0,
  };
  fechaActual = new Date()
  private info = inject(InfoService);
  private form = inject(FormBuilder);
  private usuario = inject(FacturaContratoService);
  private snack = inject(SnackbarService);
  private core = inject(CoreService);
  montoDollar$: number = 0;
  botonHabilitado = true;
  sinAfiliar: boolean = false;
  listaCuentas: boolean = false
  cuentas: any[] = []
  registradas = new FormControl()
  registrar_cuenta: boolean = false;
  closeForm: boolean = true
  myForm = new FormGroup({
    sender: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    // date: new FormControl('', Validators.required),
    reference: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    // amount: new FormControl('', Validators.required),
  });
  registro = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]),
  })
  user = this.core.getUser()
  saldoFavor = this.usuario.saldoFavor
  descuento = 0
  maxDate = new Date()

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>) { }

  ngOnInit(): void {
    this.usuario.montoDollar$.subscribe((data) => {
      this.montoDollar$ = data;
    });
    this.info.getMethod()
    // this.descuento = Number(this.factura.monto) - Number(this.factura.montoDescuento)
    this.info.datosTablas$.subscribe(data => {
      this.cuentas = data.filter((pm) => pm.method === 1).map(data => data)
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
    const calculo = this.calcular();
    const resultadoBS = this.convertirBolivares(Number(this.factura.monto))
    // if (Number(valor.amount) < Number(resultadoBS)) {
    //   return this.snack.openSnack(
    //     'El monto enviado debe ser mayor o igual que el de la factura',
    //     'error'
    //   );
    // } 
    const payment = {
      // bank: null,
      // amount: Number(valor.amount ?? '0'),
      reference: valor.reference ?? '',
      sender: valor.sender ?? '',
      method: 1,
      // date: this.core.formatearFecha(valor.date ?? ''),
    };
    this.registro.patchValue({
      phone: valor.sender
    })
    this.usuario
      .validarPago(payment)
      .then((result) => {
        this.snack.openSnack('Pago Validado', 'success');

        const numero = Number(result.amount_usd);
        const resultado = Number(numero.toFixed(2));
        const resultadoBS = this.convertirBolivares(resultado < 0 ? Number(this.factura.monto) : result.amount_usd)
        const pago = {
          payment: [
            {
              bank: null,
              method: 1,
              reference: valor.reference,
              amount: result.amount_usd,
              amount_bs:this.convertirBolivares( Number(this.factura.monto)),
              sender: valor.sender,
              date: moment(new Date()).format('YYYY-MM-DD')?? '',
              contract: null,
              payment_invoices: [
                {
                  invoice: this.factura.id,
                  amount: resultado < 0 ? this.factura.monto : result.amount_usd,
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

  calcular(): number {
    const f = Number(this.factura.monto) - this.usuario.saldoFavor;
    const s = Math.max(f, 0)
    const result = s * this.montoDollar$;
    const r = result.toFixed(2);
    return Number(r);
  }

  convertidor() {
    const s = Number(this.factura.monto)
    const result = s * this.montoDollar$;
    const r = result.toFixed(2);
    return Number(r);
  }

  convertirBolivares(monto: number): number {
    const resultado = monto * this.montoDollar$;
    return Number(Number(resultado));
  }
  showAccountBalance(item: any) {
    this.listaCuentas = false
    this.myForm.patchValue({
      sender: item.sender
    })
  }
  aggPm() {
    const valor = this.registro.value
    const body = {
      "sender": valor.phone,
      "name": valor.name,
      "email": null,
      "method": 1,
      "client": this.user.id,
    }
    this.info.postMethod(body)
      .then((result) => {
        this.snack.openSnack('Pago Movil registrado con exito', 'success')
        this.dialogRef.close(true)
      }).catch((error) => {
        //  if (error.status == 400) {
        this.snack.openSnack("Ya existe un registro con este enviante: " + valor.phone, 'error')
        return
        // }
        // this.snack.openSnack(error.error.message, 'error')
        // return
      });
  }
}
