import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-tvbox',
  templateUrl: './dialog-edit-tvbox.component.html',
  styleUrls: ['./dialog-edit-tvbox.component.css']
})
export class DialogEditTvboxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogEditTvboxComponent>) {
  }

  
}
