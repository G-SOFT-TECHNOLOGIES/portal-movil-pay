import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { Packages } from 'src/app/components/servicios/interface/paquetes.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-dialog-add-package',
  templateUrl: './dialog-add-package.component.html',
  styleUrls: ['./dialog-add-package.component.css']
})
export class DialogAddPackageComponent {
  private tvservices = inject(ServicoTvService)
  private snack = inject(SnackbarService)
  private loader = inject(LoadingService)
  packages: any[] = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogAddPackageComponent>) {
  }

  selected: any[] = []
  listPackage = new FormGroup({
    package: new FormControl<any>('')
  })
  ngOnInit(): void {
    // console.log(this.data)
    this.tvservices.getAllPackages().then((result) => {
      this.packages = result
    }).catch((err) => {
      console.log(err)
    })
  }
  Add() {
    this.loader.showLoading()
    // console.log(this.selected, 'select')
    this.tvservices.addServiceTVId(this.selected, this.data.contrato)
      .then((value) => {
        this.loader.hideLoading()
        this.dialogRef.close(true)
        console.log(value)
      }).catch((error) => {
        if (error.status == 400) {
          this.snack.openSnack(error, '')

        } else {
          this.snack.openSnack(error, '')

        }
        this.loader.hideLoading()
      })
  }

  setShopping(e: any, paquete: any) {
    if (e) {
      this.selected.push(paquete.id)
      return
    } else {
      this.selected.splice(1, paquete.id)
      return
    }
  }

}
