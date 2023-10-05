import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogPagarComponent } from 'src/app/components/finanzas/components/dialog-pagar/dialog-pagar.component';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { CoreService } from 'src/app/components/service/core.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ServicoTvService } from '../../../services/servico-tv.service';
import { InfoService } from 'src/app/components/ajustes/services/info.service';

@Component({
  selector: 'app-pago-movil',
  templateUrl: './pago-movil.component.html',
  styleUrls: ['./pago-movil.component.css']
})
export class PagoMovilComponent {
  @Input() factura: { monto: string; id: number; contract: number } = {
    monto: '0',
    id: 0,
    contract: 0,
  };
  private info = inject(InfoService);
  private tvservices = inject(ServicoTvService)
  private usuario = inject(FacturaContratoService);
  private snack = inject(SnackbarService);
  private core = inject(CoreService);
  montoDollar$: number = 0;
  botonHabilitado = true;
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
  sinAfiliar: boolean = false;
  listaCuentas: boolean = false
  cuentas: any[] = []
  registradas = new FormControl()
  registrar_cuenta: boolean = false;
  registro = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern('[0-9]*')]),
  })
  user = this.core.getUser()

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>) { }

  ngOnInit(): void {
    this.usuario.getDollar()
    this.usuario.montoDollar$.subscribe((data) => {
      this.montoDollar$ = data;
    });
    this.info.getMethod()
    this.info.datosTablas$.subscribe(data => {
      this.cuentas = data.filter((pm) => pm.method === "PAGO MOVIL").map(data => data)
    })
  }

  onSubmit() {
    this.registrar_cuenta = true
    this.botonHabilitado = false
    const valor = this.myForm.value;
    const calculo = this.calcular();
    const payment = {
      bank: null,
      amount: Number(valor.amount ?? '0'),
      reference: valor.reference ?? '',
      sender: valor.sender ?? '',
      method: 1,
      date: this.core.formatearFecha(valor.date ?? ''),
    };

    this.usuario
      .validarPago(payment)
      .then((result) => {
        this.snack.openSnack(result.message, 'success');
        const numero = Number(this.factura.monto) - Number(result.monto);
        const resultado = Number(numero.toFixed(2));
        const pago = {
          bank: null,
          method: 1,
          reference: valor.reference,
          amount: result.monto,
          amount_bs: Number(valor.amount),
          sender: valor.sender,
          date: this.core.formatearFecha(valor.date ?? ''),
          contract: this.factura.contract,
          // payment_invoices: [
          //   {
          //     invoice: this.factura.id,
          //     amount: resultado < 0 ? this.factura.monto : result.monto,
          //   },
          // ],

        };
        this.tvservices.setPagoTvBox(pago)
        // console.log(pago, 'el pago')
        this.registradas.value ??  this.dialogRef.close(true);
      })
      .catch((err) => {
        this.snack.openSnack(err, 'error');
        this.botonHabilitado = true
      });
  }

  calcular(): number {
    const f = Number(this.factura.monto);
    const result = f * this.montoDollar$;
    const r = result.toFixed(2);
    return Number(r);
  }
  convertirBolivares(dolar: number): number {
    const resultado = dolar * this.montoDollar$;
    return Number(Number(resultado).toFixed(2));
  }
  showAccountBalance(item: any) {
    this.listaCuentas = false
    this.myForm.patchValue({
      sender: item.phone
    })
  }
  aggPm() {
    const valor = this.registro.value
    const body = {
      "phone": valor.phone,
      "name": valor.name,
      "method": 1,
      "client": this.user.id,
    }
    this.info.postMethod(body)
      .then((result) => {
        this.snack.openSnack('Pago Movil registrado con exito', 'success')
        this.dialogRef.close(true)
      }).catch((err) => {
        this.snack.openSnack(err, 'error')
      });
  }
}
