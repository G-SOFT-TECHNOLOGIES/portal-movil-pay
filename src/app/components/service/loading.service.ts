import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../home/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private dialog: MatDialog
  ) { }
  showLoading(){
    
    
    const dialogRef = this.dialog.open(LoadingComponent,{
      disableClose:true
    })
    // this.load.next(true)
    dialogRef.id = "loading";
  }
  hideLoading(){
    const dialogRef = this.dialog.getDialogById("loading");
    dialogRef?.close()
    // this.load.next(false)
  }
}
