import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Density, LogoStyle, MiddleShape, CornerInnerShape, CornerOuterShape } from '@asoftwareworld/qrcode';
import jsPDF from 'jspdf';
import { LoadingService } from 'src/app/components/service/loading.service';

@Component({
  selector: 'app-pdf-canjes',
  templateUrl: './pdf-canjes.component.html',
  styleUrls: ['./pdf-canjes.component.css']
})
export class PdfCanjesComponent implements OnInit {
  private loading = inject(LoadingService)
  @ViewChild('htmlData', { static: false }) el!: ElementRef;
  @HostListener('window:resize', ['$event'])
  screenWidth: number = 0;
  screenHeight: number = 0;
  constructor(public dialogRef: MatDialogRef<PdfCanjesComponent>, @Inject(MAT_DIALOG_DATA) public canje: any){}
  title = 'Cupon de Descuento';
  option: any;
  drawTpes = [
      { label: 'SVG', value: 'svg' },
      { label: 'Canvas', value: 'canvas' },
  ];
  density: Density = {
      errorCorrectionLevel: 'Q',
      mode: 'Byte',
      typeNumber: 0
  };

  logoStyle: LogoStyle = {
      hideBackgroundCircle: true,
      logoSize: 0.3,
      logoMargin: 0
  };

  backgroundColor = '#ffffff';

  middleShape: MiddleShape = {
      color: '#000',
      type: 'circle'
  };

  cornerInnerShape: CornerInnerShape = {
      color: '#000',
      type: 'circle'
  };

  cornerOuterShape: CornerOuterShape = {
      color: '#000',
      type: 'rounded'
  };
  public qrdata = this.canje.code;
  image = '';
  ngAfterViewInit() {
    this.loading.showLoading()
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    const doc = new jsPDF('p', 'pt', 'letter', true);
    const width = doc.internal.pageSize.getWidth()
    doc.html(this.el.nativeElement, {
      x: 10,
      y: 10,
      width:  this.screenWidth ,
      windowWidth:width,
      margin: [10, 10, 10, 10],
      callback: (pdf) => {
        pdf.setFontSize(8)
        pdf.setProperties({
          title: "Cupon de Descuento",
          subject: "Cupon de Descuento",
          author: "Cupon de Descuento",
        })
          this.dialogRef.close();
          pdf.save(`cupon.pdf`);
          this.loading.hideLoading()
     
      },
      html2canvas: {
        scale: 0.95
      },
    })

  }
  ngOnInit(): void {
      this.option = {
          width: 100,
          height: 100,
          type: 'canvas',
          logo: this.image,
          outerMargin: 0,
          density: this.density,
          backgroundColor: this.backgroundColor,
          logoStyle: this.logoStyle,
          cornerInnerShape: this.cornerInnerShape,
          cornerOuterShape: this.cornerOuterShape,
          middleShape: this.middleShape
      };
  }
}
