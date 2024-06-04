import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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

  infor_contract: any;
  consumo = new BehaviorSubject<IConsumo[] | false>([]);
  informacion = new BehaviorSubject<boolean>(false);
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
    this.initForm();
    this.loadingChart();
  }

  initForm() {
    const since = moment().toDate();
    const until = moment().subtract(1, 'months').toDate();

    this.rangeDate.patchValue({
      start: until,
      end: since
    })
    this.obtenerTraficoContrato(this.contratos[0].id);
  }

  getContrato(id: number) {
    this.usuarioContratoservices.getContrato(id);
    this.usuarioContratoservices.contrato$.subscribe((data) => {
      if (data) {
        this.informacion.next(true);
        this.infor_contract = data.contract_detail;

        this.service_detail = data.contract_detail.flatMap(
          (cd) => cd.service_detail ?? []
        );
      }
    });
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
        if (result.length < 1) {
          this.totalSubida = 0;
          this.totalBajada = 0;
          this.labels = result.map((label) => {
            const period = `${nombresMeses[label.date__month]}-${
              label.date__year
            }`;
            return period;
          });
          this.loadingChart();
        }

        if (result.length > 0) {
          this.consumo.next(result);
          this.procesarResultado(result);
          this.labels = result.map((label) => {
            const period = `${nombresMeses[label.date__month]}-${
              label.date__year
            }`;
            return period;
          });
          this.loadingChart();
        } else {
          this.consumo.next(false);
        }
      })
      .catch((err) => {
        this.consumo.next(false);
      })
      .finally(() => {});
  }

  procesarResultado(result: IConsumo[]) {
    result.map((d) => {
      this.subida = [d.upload];
      this.bajada = [d.download];
      this.totalBajada = d.download;
      this.totalSubida = d.upload;
    });
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
          borderColor: documentStyle.getPropertyValue('--red-600'),
          backgroundColor: documentStyle.getPropertyValue('--red-600'),
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
