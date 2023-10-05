import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacturaContratoService } from '../../services/usuario.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogPagarComponent } from '../dialog-pagar/dialog-pagar.component';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { CoreService } from 'src/app/components/service/core.service';
import { InfoService } from 'src/app/components/ajustes/services/info.service';

@Component({
  selector: 'app-zelle',
  templateUrl: './zelle.component.html',
  styleUrls: ['./zelle.component.css'],
})
export class ZelleComponent {
  @Input() factura: { monto: string; id: number; contract: number } = {
    monto: '0',
    id: 0,
    contract: 0,
  };
  private form = inject(FormBuilder);
  private snack = inject(SnackbarService);
  private usuario = inject(FacturaContratoService);
  private core = inject(CoreService);
  private info = inject(InfoService);

  constructor(private dialogRef: MatDialogRef<DialogPagarComponent>) { }
  botonHabilitado = true;
  myForm = this.form.group({
    sender: ['', Validators.required],
    date: ['', Validators.required],
    amount: ['', Validators.required],
  });
  registro = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  registradas = new FormControl()
  registrar_cuenta: boolean = false;

  listaCuentas: boolean = false
  cuentas: any[] = []
  sinAfiliar: boolean = false
  user = this.core.getUser()

  ngOnInit(): void {
    this.info.getMethod()
    this.info.datosTablas$.subscribe(data => {
      this.cuentas = data.filter((zelle) => zelle.method === "ZELLE").map(data => data)
    })
  }
  onSubmit() {
    this.registrar_cuenta = true
    this.botonHabilitado = false
    const valor = this.myForm.value;
    const payment: any = {
      bank: null,
      amount: Number(valor.amount ?? '0'),
      reference: null,
      sender: valor.sender ?? '',
      method: 3,
      date: this.core.formatearFecha(valor.date ?? ''),
    };

    this.usuario
      .validarPago(payment)
      .then((result) => {
        this.botonHabilitado = false
        this.snack.openSnack(result.message, 'success');
        const numero = Number(this.factura.monto) - Number(result.monto);
        const resultado = Number(numero.toFixed(2));
        // if (Number(valor.amount) < Number(this.factura.monto)) {
        //   return this.snack.openSnack(
        //     'El monto enviado debe ser mayor o igual que el de la factura',
        //     'error'
        //   );
        // }
        const pago = {
          payment: [
            {
              bank: null,
              method: 3,
              reference: null,
              amount: result.monto,
              sender: valor.sender,
              date: this.core.formatearFecha(valor.date ?? ''),
              contract: this.factura.contract,
              payment_invoices: [
                {
                  invoice: this.factura.id,
                  amount: resultado < 0 ? this.factura.monto : result.monto,
                },
              ],
            },
          ],
        };
        this.usuario
          .pagarFatura(pago)
          .then((result) => {
            this.snack.openSnack('Pago Registrado con exito', 'success');
            this.registradas.value ??  this.dialogRef.close(true);
          })
          .catch((err) => {
            this.snack.openSnack(err, 'error')
            this.botonHabilitado = true
          });
      })
      .catch((err) => {
        this.snack.openSnack(err, 'error');
        this.botonHabilitado = true
      });


  }
  showAccountBalance(item: any) {
    this.listaCuentas = false
    this.myForm.patchValue({
      sender: item.name
    })
  }
  aggZelle() {
    const valor = this.registro.value
    const body = {
      "phone": valor.email,
      "name": valor.name,
      "method": 3,
      "client": this.user.id,
    }
    this.info.postMethod(body)
      .then((result) => {
        this.snack.openSnack('Zelle registrado con exito', 'success')
        this.dialogRef.close(true)
      }).catch((err) => {
        console.log(err);
      });
  }
}