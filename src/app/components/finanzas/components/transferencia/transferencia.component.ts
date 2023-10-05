import { Component, inject, Input, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacturaContratoService } from '../../services/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { CoreService } from 'src/app/components/service/core.service';
import { InfoService } from 'src/app/components/ajustes/services/info.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent {
  @Input() factura: { monto: string; id: number; contract: number } = {
    monto: '0',
    id: 0,
    contract: 0,
  };
  private info = inject(InfoService);
  private usuario = inject(FacturaContratoService);
  private snack = inject(SnackbarService);
  private core = inject(CoreService);
  montoDollar$: number = 0;
  botonHabilitado = true;
  sinAfiliar: boolean = false;
  registrar_cuenta: boolean = false;
  registradas = new FormControl()
  listaCuentas: boolean = false
  cuentas: any[] = []
  user = this.core.getUser()

  myForm = new FormGroup({
    bank: new FormControl('', [
      Validators.required
    ]),
    date: new FormControl('', Validators.required),
    reference: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
      Validators.pattern('[0-9]*')
    ]),
    sender: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
      Validators.pattern('[0-9]*')
    ]),
    amount: new FormControl('', Validators.required),
  });
  registro = new FormGroup({
    name: new FormControl('', Validators.required),
    nro_cuenta: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern('[0-9]*')]),
  })

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>) { }

  ngOnInit(): void {
    this.usuario.getDollar()
    this.usuario.montoDollar$.subscribe((data) => {
      this.montoDollar$ = data;
    });
    this.info.getMethod()
    this.info.datosTablas$.subscribe(data => {
      this.cuentas = data.filter((pm) => pm.method === "TRANSFERENCIA").map(data => data)
    })
  }

  onSubmit() {
    this.registrar_cuenta = true
    this.botonHabilitado = false

    const valor = this.myForm.value;
    const calculo = this.calcular();
    const resultadoBS = this.convertirBolivares(Number(this.factura.monto))
    this.registro.patchValue({
      nro_cuenta: valor.sender
    })
    const payment = {
      bank: valor.bank,
      amount: Number(valor.amount ?? '0'),
      reference: valor.reference ?? '',
      sender: valor.sender,
      method: 4,
      date: this.core.formatearFecha(valor.date ?? ''),
    };

    this.usuario
      .validarPago(payment)
      .then((result) => {
        this.snack.openSnack(result.message, 'success');
        const numero = (Number(this.factura.monto) - Number(result.monto));
        const resultado = Number(numero.toFixed(2));
        // console.log(this.factura.monto, 'antes de calcular')
        // if (Number(valor.amount) < Number(resultadoBS)) {
        //   return this.snack.openSnack(
        //     'El monto enviado debe ser mayor o igual que el de la factura',
        //     'error'
        //   );
        // }
        // const resultadoBS = this.convertirBolivares(resultado < 0 ? result.monto : Number(this.factura.monto))
        const pago = {
          payment: [
            {
              bank: valor.bank,
              method: 4,
              reference: valor.reference,
              amount: result.monto,
              amount_bs: Number(valor.amount),
              sender: valor.sender,
              date: this.core.formatearFecha(valor.date ?? ''),
              contract: this.factura.contract,
              payment_invoices: [
                {
                  invoice: this.factura.id,
                  amount: resultado < 0 ? this.factura.monto : result.monto,
                },
              ],
            }
          ]
        };
        this.registradas.value ? this.dialogRef.close(true) : '';
        this.usuario
          .pagarFatura(pago)
          .then((result) => {
            this.snack.openSnack('Pago Registrado con exito', 'success');

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
    // console.log(this.factura.monto, 'calcular', this.montoDollar$)
    const f = Number(this.factura.monto);
    const result = f * this.montoDollar$;
    const r = result.toFixed(2);
    return Number(r);
  }
  convertirBolivares(dolar: number): number {
    const resultado = dolar * this.montoDollar$;
    // console.log(resultado, 'en convertir')
    return Number(Number(resultado).toFixed(2));
  }

  showAccountBalance(item: any) {
    this.listaCuentas = false
    this.myForm.patchValue({
      sender: item.phone
    })
  }
  aggTransferencia() {
    const valor = this.registro.value
    const body = {
      "phone": valor.nro_cuenta,
      "name": valor.name,
      "method": 4,
      "client": this.user.id,
    }
    this.info.postMethod(body)
      .then((result) => {
        this.snack.openSnack('Transferencia registrada con exito', 'success')
        this.dialogRef.close(true)
      }).catch((err) => {
        console.log(err);
      });
  }
}

