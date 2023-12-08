import { Component, inject } from '@angular/core';
import { CanjesService } from '../../services/canjes.service';
import { PageEvent } from '@angular/material/paginator';
import { ParamsCanjes } from '../../models/paramsCajes';
import { MatDialog } from '@angular/material/dialog';
import { PdfCanjesComponent } from '../pdf-canjes/pdf-canjes.component';

@Component({
  selector: 'app-table-canjes',
  templateUrl: './table-canjes.component.html',
  styleUrls: ['./table-canjes.component.css']
})
export class TableCanjesComponent {
  private canjes = inject(CanjesService);
  private dialog = inject(MatDialog);
  results:any
  count:number=0
  params: ParamsCanjes= new ParamsCanjes;
  nextPageIndex: number = 1;
  ngOnInit(){
    this.getCanjes()
  }

  getCanjes(){
    this.canjes.getCanjes(this.setProperty()).then(resp=>{
      console.log(resp);
      this.count=resp.count
      this.results=resp.results
    })
  }

  setProperty() {
    this.params.page=this.nextPageIndex
     return this.params;
  }
  onPageChange(event: PageEvent) {
    this.nextPageIndex = event.pageIndex + 1;
    this.getCanjes()
  }

  downloadPdf(data:any){
    const dialog = this.dialog.open(PdfCanjesComponent, {
      width: window.innerWidth > 639 ? '40%' : '100%',
      data:data
    });
  }
}
