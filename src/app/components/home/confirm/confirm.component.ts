import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  
  constructor(private dialogRef: MatDialogRef<ConfirmComponent>,@Inject(MAT_DIALOG_DATA) public message: any){

  }

  confirm(){
    this.dialogRef.close('llego')
  }
}
