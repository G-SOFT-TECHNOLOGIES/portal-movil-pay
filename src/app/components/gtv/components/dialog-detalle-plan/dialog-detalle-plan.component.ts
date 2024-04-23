import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/components/service/loading.service';
import { PlanID } from 'src/app/components/servicios/interface/servicestv.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-dialog-detalle-plan',
  templateUrl: './dialog-detalle-plan.component.html',
  styleUrls: ['./dialog-detalle-plan.component.css']
})
export class DialogDetallePlanComponent {
  private services = inject(ServicoTvService)
  private router = inject(Router)
  private loading = inject(LoadingService)
  infor !: PlanID;
  channels_plan_gtv: any[] = []
  constructor(
    public dialogRef: MatDialogRef<DialogDetallePlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.loading.showLoading()
    this.services.getTypesServicesTVId(this.data.id).then((result) => {
      this.loading.hideLoading()
      this.infor = result
    }).catch((err) => {
      console.log(err)
      this.loading.hideLoading()

    })
  }
  adquirir() {
    this.services.setPlan(this.infor)
    this.router.navigate(['home/gtv/subscribete', this.infor.id]);
    this.dialogRef.close(true)
  }
}
