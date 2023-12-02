import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FacturaContratoService } from '../../services/usuario.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ConfirmComponent } from 'src/app/components/home/confirm/confirm.component';

@Component({
  selector: 'app-dialog-pagar',
  templateUrl: './dialog-pagar.component.html',
  styleUrls: ['./dialog-pagar.component.css'],

})
export class DialogPagarComponent {
  selectedOption:string = '0'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,){        
  }
  private factura = inject(FacturaContratoService);
  private snack = inject(SnackbarService)
  private dialog = inject(MatDialog);
  cupon:any;
  ngOnInit(){
    console.log(this.data);
    
  }

  validateCupon(){
    const body={
      "invoice": this.data.id,
      "code": this.cupon.toLocaleUpperCase()
    }

    this.factura.validateCupon(body).then(resp=>{
      this.snack.openSnack("Cupon Validado","cerrar");

      const dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message:`Este Cupon aplica para un ${resp.percentage}% de Descuento, tu monto total seria ${resp.amount}$.`,
  
        },
      });
  
      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          const body={
            coupon:resp.coupon
          }
          this.factura.patchDiscountInvoice(this.data.id,body).then(result=>{
            if(resp.amount==0){
              this.snack.openSnack("Factura Pagada con Cupon.","cerrar");
              dialogRef.close(true);

            }else{
              this.data.montoDescuento=resp.amount
              this.snack.openSnack("Cupon Aplicado a Factura.","cerrar");
              // this.setvalues()
            }
          

          })

        }
      });

    }).catch((err:any)=>{
      console.log(err);
      
      this.snack.openSnack(err,"cerrar");
    })
    
  }

}
