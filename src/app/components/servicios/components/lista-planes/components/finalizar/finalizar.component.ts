import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription, count } from 'rxjs';
import { ConfirmService } from 'src/app/components/service/confirm.service';
import { Packages } from 'src/app/components/servicios/interface/paquetes.interface';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent {
  private router = inject(Router)
  private tvservices = inject(ServicoTvService)
  private confirm = inject(ConfirmService);
  private dialog = inject(MatDialog);
  private rout = inject(ActivatedRoute)
  sub !: Subscription
  verOpciones: boolean = false
  items!: MenuItem[];
  shopping$ = this.tvservices.itemsCount
  subscrito: boolean = false
  lista_paquetes: any = []

  visible: boolean = false;
  subscription!: Subscription;
  id: number = 0
  id_contrato = this.tvservices.id_contrato$
  total: number = 0;
  acumulado = this.tvservices.totalAcumulado$
  equipoCount = this.tvservices.equipo$
  planActivo = this.tvservices.plan$
  packages: Packages[] = []
  selectedPaquetes: any[] = [];
  tvbox: any[] = []
  constructor() {
    this.sub = this.rout.params.subscribe((data) => {
      this.id = data['id'];
    });
  }



  showDialog() {
    this.visible = true;
  }


  atras() {
    this.tvservices.deleteItems()
    this.router.navigate(['/'])

  }

  ngOnInit() {
    this.tvservices.getIdContract()
    this.tvservices.getPlan()
    this.tvservices.getEquipo()
    this.getItemsTotalCount()
    this.tvservices.equipo$.subscribe(data => {
      if (data.length > 0) {
        data.map((count) => this.total = count.count)
      } else {
        this.total = this.total
      }
    })
    this.getAllPackage()
    this.getTVBox()
  }

  finalizar() {
    this.router.navigate(['home/servicios_tv/planes/finalizar', this.id]);
  }
  getItemsTotalCount() {
    this.tvservices.getTotalAcumm()
    this.tvservices.getTotalItems()
  }
  suma() {
    this.total = this.total + 1
    let equipo = {
      "count": this.total,
      "cost": this.tvbox[0].cost,
      "product": this.tvbox[0].id,
      "name": this.tvbox[0].name
    }
    this.tvservices.setEquipo(equipo)
    this.tvservices.getEquipo()
    this.getItemsTotalCount()

  }
  resta() {
    this.total = this.total - 1
    let equipo = {
      "count": this.total,
      "cost": this.tvbox[0].cost,
      "product": this.tvbox[0].id,
      "name": this.tvbox[0].name
    }
    this.tvservices.setEquipo(equipo)
    this.tvservices.getEquipo()
    this.getItemsTotalCount()

  }
  getAllPackage() {
    this.tvservices.getAllPackages().then((result) => {
      this.packages = result
    }).catch((err) => {
      console.log(err)
    })
  }
  getTVBox() {
    this.tvservices.getTvBox().then((result) => {
      this.tvbox = result
    }).catch((err) => {
      this.tvbox = []
    })

  }
}
