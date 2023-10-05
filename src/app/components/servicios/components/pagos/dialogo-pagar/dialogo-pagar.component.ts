import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-pagar',
  templateUrl: './dialogo-pagar.component.html',
  styleUrls: ['./dialogo-pagar.component.css']
})
export class DialogoPagarComponent {
  selectedOption:string = '0'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,){        
  }
}
