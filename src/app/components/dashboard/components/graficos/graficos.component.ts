import { Component, Input, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FacturaContratoService } from 'src/app/components/finanzas/services/usuario.service';
import { Contract } from 'src/app/components/usuario/interfaces/contractosInterfaces';
import { DashboardService } from '../../services/dashboard.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Graficos } from '../../interface/graficos.interface';

@Component({
    selector: 'app-graficos',
    templateUrl: './graficos.component.html',
    styleUrls: ['./graficos.component.css']
})
export class GraficosComponent {
    @Input() contratos: Contract[] = []
    private servicesDash = inject(DashboardService)
    private usuarioContratoservices = inject(FacturaContratoService)
    infor_contract: any;
    consumo = new BehaviorSubject<Graficos[] | false>([])
    informacion = new BehaviorSubject<boolean>(false)
    data: any;
    rangeDates: Date[] = [];
    rangeDate = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });
    subida: any[] = []
    bajada: any[] = []
    labels: any[] = []
    totalSubida: number = 0
    totalBajada: number = 0
    options: any;
    service_detail: any[] = []

    ngOnInit() {
        this.calcularPrimeryUltimoDia()
        this.getContrato(this.contratos[0].id)
        this.loadingChart()
    }
    async getContrato(id: number) {
        let body: any = {
            id,
            since: '',
            until: ''
        }
        if (this.rangeDate.value?.start && this.rangeDate.value?.end) {
            body.since = new Date(this.rangeDate.value?.start).toLocaleDateString("fr-CA",);
            body.until = new Date(this.rangeDate.value?.end).toLocaleDateString("fr-CA",)
        }
        this.usuarioContratoservices.getContrato(id)
        this.usuarioContratoservices.contrato$.subscribe(data => {
            if (data) {
                this.informacion.next(true)
                this.infor_contract = data.contract_detail
                data.contract_detail.map((cd) => {
                    return this.service_detail = cd.service_detail?.map((sd) => sd)
                })

            }
        })
        this.servicesDash.getTrafickContract(body).then((result) => {
            if (result.length > 0) {
                this.consumo.next(result);
                this.subida = result.map((up) => this.calcularFormula(up.up))
                this.bajada = result.map((down) => this.calcularFormula(down.dw))
                this.labels = result.map((label) => label.date)
                this.totalBajada = this.bajada.reduce((acc, value) => Number(acc) + Number(value)).toFixed(2)
                this.totalSubida = this.subida.reduce((acc, value) => Number(acc) + Number(value)).toFixed(2)
                this.loadingChart()
            } else {
                this.consumo.next(false);
            }

        }).catch((err) => {
            this.consumo.next(false)
        })


    }

    // calcularDia0yDia6() {
    //     let fechaActual = new Date();
    //     let diaActual = fechaActual.getDay(); // 0 para domingo, 1 para lunes, ..., 6 para sábado
    //     let dia0 = new Date(fechaActual);
    //     dia0.setDate(fechaActual.getDate() - diaActual);
    //     let dia6 = new Date(fechaActual);
    //     let diasHastaSabado = 6 - diaActual;
    //     dia6.setDate(fechaActual.getDate() + diasHastaSabado);
    //     this.rangeDate.patchValue({
    //         start: new Date(dia0),
    //         end: new Date(dia6),
    //     })
    // }
    calcularPrimeryUltimoDia() {
        let fechaActual = new Date();
        let primerDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        let ultimoDiaDelMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0);

        this.rangeDate.patchValue({
            start: new Date(primerDiaDelMes),
            end: new Date(ultimoDiaDelMes),
        })
    }
    calcularFormula(variable: any) {
        return (Number(variable) / (1000 * 1000 * 1000)).toFixed(2)
        // return 1.0e-9 * Number(variable);
    }
    loadingChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-primary');
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
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            },
            responsive: true,
        };
    }
    resetData() {
        this.subida = []
        this.bajada = []
        this.labels = []
        this.totalBajada = 0
        this.totalSubida = 0
        this.informacion.next(false); this.consumo.next(false)
        this.service_detail = []
        this.calcularPrimeryUltimoDia()
    }
}

