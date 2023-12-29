import { Component, inject, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacturaContratoService } from '../../services/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { CoreService } from 'src/app/components/service/core.service';
import { InfoService } from 'src/app/components/ajustes/services/info.service';

@Component({
  selector: 'app-pago-movil',
  templateUrl: './pago-movil.component.html',
  styleUrls: ['./pago-movil.component.css'],
})
export class PagoMovilComponent {
  @Input() factura: { monto: string; id: number; contract: number; montoDescuento: string; } = {
    monto: '0',
    montoDescuento: '0',
    id: 0,
    contract: 0,
  };
  fechaActual= new Date()
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
  myForm = new FormGroup({
    sender: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    date: new FormControl('', Validators.required),
    reference: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    amount: new FormControl('', Validators.required),
  });
  registro = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]),
  })
  user = this.core.getUser()
  saldoFavor = this.usuario.saldoFavor
  descuento=0
  maxDate = new Date()

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>) { }

  ngOnInit(): void {
    this.usuario.montoDollar$.subscribe((data) => {
      this.montoDollar$ = data;
    });
    this.info.getMethod()
    this.descuento=Number(this.factura.monto)-Number(this.factura.montoDescuento)
    this.info.datosTablas$.subscribe(data => {
      this.cuentas = data.filter((pm) => pm.method === 1).map(data => data)
    })
  }

  onSubmit() {
    this.registrar_cuenta = true
    this.botonHabilitado = false
    const valor = this.myForm.value;
    const calculo = this.calcular();
    const resultadoBS = this.convertirBolivares(Number(this.factura.monto))
    if (Number(valor.amount) < Number(resultadoBS)) {
      return this.snack.openSnack(
        'El monto enviado debe ser mayor o igual que el de la factura',
        'error'
      );
    } 
    const payment = {
      bank: null,
      amount: Number(valor.amount ?? '0'),
      reference: valor.reference ?? '',
      sender: valor.sender ?? '',
      method: 1,
      date: this.core.formatearFecha(valor.date ?? ''),
    };
    this.registro.patchValue({
      phone: valor.sender
    })
    this.usuario
      .validarPago(payment)
      .then((result) => {
        this.snack.openSnack(result.message, 'success');
        const numero = Number(this.factura.montoDescuento) - Number(result.monto);
        const resultado = Number(numero.toFixed(2));
        const resultadoBS = this.convertirBolivares(resultado < 0 ? Number(this.factura.monto) : result.monto)
        const pago = {
          payment: [
            {
              bank: null,
              method: 1,
              reference: valor.reference,
              amount: result.monto,
              amount_bs: Number(valor.amount),
              sender: valor.sender,
              date: this.core.formatearFecha(valor.date ?? ''),
              contract: this.factura.contract,
              payment_invoices: [
                {
                  invoice: this.factura.id,
                  amount: resultado < 0 ? this.factura.montoDescuento : result.monto,
                },
              ],
            },
          ],
        };
        this.usuario
          .pagarFatura(pago)
          .then((result) => {
            this.snack.openSnack('Pago Registrado con exito', 'success');
            this.registradas.value ? this.dialogRef.close(true) : '';
          })
          .catch((err) => {
            this.snack.openSnack(err, 'error');
            this.botonHabilitado = true
          });
      })
      .catch((err) => {
        this.snack.openSnack(err, 'error');
        this.botonHabilitado = true
      });
  }

  calcular(): number {
    const f = Number(this.factura.montoDescuento) - this.usuario.saldoFavor;
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
      "email":null,
      "method": 1,
      "client": this.user.id,
    }
    this.info.postMethod(body)
      .then((result) => {
        this.snack.openSnack('Pago Movil registrado con exito', 'success')
        this.dialogRef.close(true)
      }).catch((error) => {
        if (error== "Bad Request") {
          this.snack.openSnack("Ya existe un registro con este enviante: "+valor.phone, 'error')
          return
        }
        this.snack.openSnack(error, 'error')
        return
      });
  }
}
