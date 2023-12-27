import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogPagarComponent } from 'src/app/components/finanzas/components/dialog-pagar/dialog-pagar.component';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { CoreService } from 'src/app/components/service/core.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ServicoTvService } from '../../../services/servico-tv.service';
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
  private tvservices = inject(ServicoTvService)
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

  registro = new FormGroup({
    name: new FormControl('', Validators.required),
    nro_cuenta: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4), Validators.pattern('[0-9]*')]),
  })

  myForm = new FormGroup({
    bank: new FormControl('', [
      Validators.required
    ]),
    date: new FormControl('', Validators.required),
    reference: new FormControl('', [
      Validators.required,
      Validators.maxLength(6)

    ]),
    sender: new FormControl('', [
      Validators.required,
      Validators.maxLength(4)

    ]),
    amount: new FormControl('', Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>) { }

  ngOnInit(): void {
    this.usuario.getDollar()
    this.usuario.montoDollar$.subscribe((data) => {
      this.montoDollar$ = data;
    });
    this.info.getMethod()
    this.info.datosTablas$.subscribe(data => {
      this.cuentas = data.filter((pm) => pm.method === 4).map(data => data)
    })
  }

  onSubmit() {
    this.registrar_cuenta = true
    this.botonHabilitado = false
    const valor = this.myForm.value;
    const calculo = this.calcular();
    const payment = {
      bank: valor.bank,
      amount: Number(valor.amount ?? '0'),
      reference: valor.reference ?? '',
      sender: valor.sender,
      method: 4,
      date: this.core.formatearFecha(valor.date ?? ''),
    };
    this.registro.patchValue({
      nro_cuenta: valor.sender
    })
    this.usuario
      .validarPago(payment)
      .then((result) => {
        this.snack.openSnack(result.message, 'success');
        const numero = (Number(this.factura.monto) - Number(result.monto));
        const resultado = Number(numero.toFixed(2));
        console.log(this.factura.monto, 'antes de calcular')
        console.log(valor.amount)

        // const resultadoBS = this.convertirBolivares(resultado < 0 ? result.monto : Number(this.factura.monto))
        const pago = {
          bank: valor.bank,
          method: 1,
          reference: valor.reference,
          amount: result.monto,
          amount_bs: Number(valor.amount),
          sender: valor.sender,
          date: this.core.formatearFecha(valor.date ?? ''),
          contract: this.factura.contract,
         };
        this.tvservices.setPagoTvBox(pago)
        // console.log(pago, 'el pago') 
        this.registradas.value ? this.dialogRef.close(true) : '';
      
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
    console.log(resultado, 'en convertir')
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
