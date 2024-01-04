import { Component, ElementRef, EventEmitter, HostListener, Inject, Output, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/components/components/dialog-confirm/dialog-confirm.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dialog-firma',
  templateUrl: './dialog-firma.component.html',
  styleUrls: ['./dialog-firma.component.css']
})
export class DialogFirmaComponent {
  private readonly dialog = inject(MatDialog)
  private readonly usuario = inject(UsuarioService)

  @ViewChild('signPad', { static: false }) signPad!: ElementRef<HTMLCanvasElement>;
  @Output() signatureSaved = new EventEmitter();
  private signatureImg: any;
  private sigPadElement: any;
  private context: any;
  private isDrawing!: boolean;
  isMobile = window.innerWidth < 460;
  public height = window.innerHeight
  public width = window.innerWidth
  private cx!: CanvasRenderingContext2D;


  constructor(
    public dialogRef: MatDialogRef<DialogFirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  public ngAfterViewInit(): void {
    this.sigPadElement = this.signPad.nativeElement;
    // this.render()
    this.context = this.sigPadElement.getContext('2d');
    // this.context = this.cx.ge;
    this.sigPadElement.width = window.innerWidth > 320 ? '650' : '220'
    this.sigPadElement.height = window.innerWidth > 320 ? '450' : '450';
    this.context.strokeStyle = '#000';
    this.context.lineWidth = 1
    this.context.lineCap = 'round';
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any): void {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  onMouseDown(e: any): void {
    // The mouse button is clicked, which means the start of drawing the signature
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any): void {
    // The mouse button is released, so this means the end of drawing the signature
    this.isDrawing = false;
  }

  clearSignature(): void {
    this.signatureImg = undefined;
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  saveSignature(): void {
    this.signatureImg = this.sigPadElement.toDataURL('image/png');
    const byteCharacters = atob(this.signatureImg.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Obtener el tamaño del blob en bytes
    const imageSizeInBytes = blob.size;
    if (imageSizeInBytes <= 13451) {
      return
    }
    const dialog = this.dialog.open(DialogConfirmComponent, {
    })
    dialog.afterClosed().subscribe(d => {
      if (d) {
        const body = {
          signe_base64: this.signatureImg
        }
        this.usuario.patchUsuario(body, this.data)
        this.dialogRef.close(true)
        setTimeout(() => {
          location.reload()
        }, 1000);
      }
    })
    // Convertir el tamaño a kilobytes (KB) o megabytes (MB) si lo deseas
    //const imageSizeInKB = imageSizeInBytes / 1024;        
    //this.signatureSaved.emit(this.signatureImg);
  }

  private relativeCoords(event: any): { x: number, y: number } {
    const bounds = event.target.getBoundingClientRect();
    const cords = {
      clientX: event.clientX || event.changedTouches[0].clientX,
      clientY: event.clientY || event.changedTouches[0].clientY
    };
    const x = cords.clientX - bounds.left;
    const y = cords.clientY - bounds.top;
    return { x, y };
  }
  private render(): any {
    const canvasEl = this.signPad.nativeElement
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.cx.lineWidth = 3
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000'
  }
  private write(res: any): any {
    const canvasEl = this.signPad.nativeElement
    const rect = canvasEl.getBoundingClientRect();
    const props = {
      x: res.clientX - rect.left,
      y: res.clientY - rect.top
    }



  }
   pruebaA() {
    alert('Prueba')
  }

}
