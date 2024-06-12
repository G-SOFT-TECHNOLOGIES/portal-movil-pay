import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';
// Services
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { DashboardService } from '../../services/dashboard.service';
// Interfaces
import { Contract } from 'src/app/components/usuario/interfaces/contractosInterfaces';
import {
  ConsumoParams,
  IConsumo,
  IServiceDetail,
} from '../../interface/graficos.interface';
import { ContratoID } from 'src/app/components/finanzas/interfaces/UsuarioIDInterface';

interface NombresMeses {
  [key: number]: string;
}

const nombresMeses: NombresMeses = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre',
};

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
})
export class GraficosComponent {
  @Input() contratos: Contract[] = [];
  private servicesDash = inject(DashboardService);
  private usuarioContratoservices = inject(FacturaContratoService);

  infor_contract!: ContratoID;
  consumo = new BehaviorSubject<IConsumo[] | false>([]);
  informacion = new BehaviorSubject<boolean>(false);
  private contratoSubscription: Subscription| null = null;
  data: any;
  rangeDates: Date[] = [];
  subida: number[] = [];
  bajada: number[] = [];
  labels: string[] = [];
  totalSubida: number = 0;
  totalBajada: number = 0;
  options: any;
  service_detail: IServiceDetail[] = [];

  rangeDate = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.getContrato(this.contratos[0].id);
  }

  ngOnDestroy() {
    if (this.contratoSubscription) {
      this.contratoSubscription.unsubscribe();
    }
  }
  
  getContrato(id: number) {
    if (this.contratoSubscription) {
      this.contratoSubscription.unsubscribe();
    }

    this.usuarioContratoservices.getContrato(id);

    this.contratoSubscription = this.usuarioContratoservices.contrato$.subscribe((data) => {
      if (data) {
        this.informacion.next(true);
        this.infor_contract = data;

        this.service_detail = data.contract_detail.flatMap(
          (cd) => cd.service_detail ?? []
        );
        this.initForm();
      }
    });
  }

  initForm() {
    const { invoice_date_cicle } = this.infor_contract;

     // Fecha actual
    const today = moment();

    // Determinar el inicio y fin del ciclo de facturación
    let start: Date, end: Date;
    
    if (today.date() < invoice_date_cicle) {
        // Si la fecha actual es antes del día del ciclo de facturación de este mes
        start = moment().subtract(2, 'months').date(invoice_date_cicle).toDate(); // Inicio del ciclo de facturación (ej. 10 del mes anterior)
        end = moment().subtract(1, 'months').date(invoice_date_cicle).toDate(); // Fin del ciclo de facturación (ej. 10 de este mes)
    } else {
        // Si la fecha actual es en o después del día del ciclo de facturación de este mes
        start = moment().subtract(1, 'months').date(invoice_date_cicle).toDate(); // Inicio del ciclo de facturación (ej. 10 de este mes)
        end = moment().date(invoice_date_cicle).toDate(); // Fin del ciclo de facturación (ej. 10 del próximo mes)
    }

    this.rangeDate.patchValue({
      start: start,
      end: end
    })
    this.obtenerTraficoContrato(this.contratos[0].id);
    this.loadingChart();
  }

  crearBody() {
    let params: ConsumoParams = new ConsumoParams();
    params.group = 'month';

    if (this.rangeDate.value?.start && this.rangeDate.value?.end) {
      params.since = moment(new Date(this.rangeDate.value.start)).format(
        'YYYY-MM-DD'
      );
      params.until = moment(new Date(this.rangeDate.value.end)).format(
        'YYYY-MM-DD'
      );
    } else {
      params.since = moment(new Date()).format('YYYY-MM-DD');
      params.until = moment(new Date()).format('YYYY-MM-DD');
    }

    return params;
  }

  obtenerTraficoContrato(id: number) {
    const params = this.crearBody();

    this.servicesDash
      .getTrafickContract(id, params)
      .then((result) => {
        if (result.length > 0) {
          this.consumo.next(result);
          this.procesarResultado(result);
          this.labels = result.map((label) => {
            const period = `${nombresMeses[label.date__month]}-${label.date__year}`;
            return period;
          });
          this.loadingChart();
        } else {
          this.totalSubida = 0;
          this.totalBajada = 0;
          this.labels = [];
          this.subida = [];
          this.bajada = [];
          this.consumo.next(false);
          this.loadingChart();
        }
      })
      .catch((err) => {
        this.consumo.next(false);
      })
      .finally(() => {});
  }

  procesarResultado(result: IConsumo[]) {
    this.subida = result.map(d => d.upload);
    this.bajada = result.map(d => d.download);
    this.totalSubida = this.subida.reduce((sum, current) => sum + current, 0);
    this.totalBajada = this.bajada.reduce((sum, current) => sum + current, 0);
  }

  loadingChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-primary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Subida',
          data: this.subida,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--gray-900'),
          backgroundColor: documentStyle.getPropertyValue('--gray-900'),
        },
        {
          label: 'Bajada',
          data: this.bajada,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-600'),
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.raw !== null) {
                label += context.raw + ' GB';
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
      responsive: true,
    };
  }

  resetData() {
    this.subida = [];
    this.bajada = [];
    this.labels = [];
    this.totalBajada = 0;
    this.totalSubida = 0;
    this.informacion.next(false);
    this.consumo.next(false);
    this.service_detail = [];
  }
}
