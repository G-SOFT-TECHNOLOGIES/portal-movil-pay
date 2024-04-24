import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-dialog-edit-panatalla',
  templateUrl: './dialog-edit-panatalla.component.html',
  styleUrls: ['./dialog-edit-panatalla.component.css']
})
export class DialogEditPanatallaComponent {
  private tvservices = inject(ServicoTvService)
  private snack = inject(SnackbarService)
  private loader = inject(LoadingService)
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogEditPanatallaComponent>) {
  }
  is_status = new FormGroup({
    status: new FormControl('')
  })
  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }
  ngOnInit(): void {
    // console.log(this.data)
  }
  unlinkSession(item: any) {
    this.loader.showLoading()
    let body = {
      "contract_detail": this.data.contrato,
      "serial": item.serialNumber
    }
    // console.log(body, 'body')
    this.tvservices.unlinkAccount(body).then((value) => {
      console.log(value)
      this.loader.hideLoading()
      this.dialogRef.close(true)
      this.snack.openSnack("Cuenta desvinculada", 'success')
    }).catch((error) => {
      console.log(error)
      this.loader.hideLoading()
      this.snack.openSnack(error, 'success')

    })
  }

}
