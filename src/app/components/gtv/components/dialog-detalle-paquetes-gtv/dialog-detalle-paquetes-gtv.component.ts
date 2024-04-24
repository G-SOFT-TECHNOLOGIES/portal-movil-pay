import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDetallePlanComponent } from '../dialog-detalle-plan/dialog-detalle-plan.component';

@Component({
  selector: 'app-dialog-detalle-paquetes-gtv',
  templateUrl: './dialog-detalle-paquetes-gtv.component.html',
  styleUrls: ['./dialog-detalle-paquetes-gtv.component.css']
})
export class DialogDetallePaquetesGtvComponent {
  channels_plan_gtv: any[] = []
  constructor(
    public dialogRef: MatDialogRef<DialogDetallePlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    // 
  }
}
