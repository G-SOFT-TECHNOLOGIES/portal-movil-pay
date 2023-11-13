import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-pagar',
  templateUrl: './dialog-pagar.component.html',
  styleUrls: ['./dialog-pagar.component.css'],

})
export class DialogPagarComponent {
  selectedOption:string = '0'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,){        
  }

  ngOnInit(){
    console.log(this.data);
    
  }

}
