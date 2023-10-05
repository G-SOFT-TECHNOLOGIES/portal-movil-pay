import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  confirm:boolean = false
  constructor(
    private dialog: MatDialog
  ) { }

  
  

  // closeConfirm(){
  //   const dialogRef = this.dialog.getDialogById("confirm");
  //   dialogRef?.close('llego')
  //   return this.confirm
  // }
}
