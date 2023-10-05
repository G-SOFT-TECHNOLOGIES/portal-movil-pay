import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private load = new BehaviorSubject<boolean>(false)
  loading$ = this.load.asObservable()
  constructor(
    private dialog: MatDialog
  ) { }

  showLoading() {
    const dialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'bg-transparent',
    })
    dialogRef.id = "loading";
  }
  hideLoading() {
    const dialogRef = this.dialog.getDialogById("loading");
    dialogRef?.close()
  }

}
