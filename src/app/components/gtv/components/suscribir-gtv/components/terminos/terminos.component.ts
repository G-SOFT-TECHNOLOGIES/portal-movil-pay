import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { ServicoTvService } from 'src/app/components/servicios/services/servico-tv.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent {
  private router = inject(Router)
  private snack = inject(SnackbarService)
  private services = inject(ServicoTvService)
  disabled: boolean = true
  loading: boolean = false;
  formGroup = new FormGroup({
    value: new FormControl('off'),
    checked: new FormControl<boolean>(false)
  });
  checked: boolean = false
  uploadedFiles: any[] = [];
  @Output() response = new EventEmitter<boolean>()
  firma: any = this.services.firma.value
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  ngOnInit() {
    if (this.firma == null) {
      this.snack.openSnack("Por favor debe firmar su contrato para poder adquirir el servicio de GTV", 'X')
      this.services.deleteItems()
      this.router.navigate(['home/contratos'])
    }
    this.formGroup.valueChanges.subscribe(data => {
      this.visible = false
      this.checked = !this.checked
      this.response.emit(!data.checked)
    })
  }

  changeOption(event: any) {
    if (event) {
      this.visible = false;
      this.response.emit(false)
    } else {
      this.visible = false;
      this.response.emit(true)

    }

  }


}
