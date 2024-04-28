import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  disabled: boolean = true
  loading: boolean = false;
  formGroup =new FormGroup({
    value: new FormControl('off'),
    checked: new FormControl<boolean>(false)
  });
  checked: boolean = false
  uploadedFiles: any[] = [];
  @Output() response = new EventEmitter<boolean>()

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  ngOnInit() {
    this.formGroup.valueChanges.subscribe(data=> {
      this.visible = false
      this.checked =!this.checked
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
