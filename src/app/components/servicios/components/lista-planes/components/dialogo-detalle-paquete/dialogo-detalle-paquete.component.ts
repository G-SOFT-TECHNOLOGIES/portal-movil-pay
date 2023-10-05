import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-detalle-paquete',
  templateUrl: './dialogo-detalle-paquete.component.html',
  styleUrls: ['./dialogo-detalle-paquete.component.css']
})
export class DialogoDetallePaqueteComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoDetallePaqueteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    // console.log(this.data)
  }
}
