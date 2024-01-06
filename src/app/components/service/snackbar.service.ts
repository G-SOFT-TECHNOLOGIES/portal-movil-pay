import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snack = inject(MatSnackBar)

  constructor() { }
  
  openSnack(title:string, status:string){
    
    this.snack.open(title,'X',{
      horizontalPosition:'center' ,
      verticalPosition:'bottom' ,
      duration: 5000,
      panelClass:[`style-${status}`]
    })
  }
}
