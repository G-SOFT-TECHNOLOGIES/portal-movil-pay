import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-publicidad-images',
  templateUrl: './publicidad-images.component.html',
  styleUrls: ['./publicidad-images.component.css']
})
export class PublicidadImagesComponent {
  image1 = '../../../assets/img/PRÓXIMAMENTE.gif'
  image2 = '../../../assets/img/proximamente-blanco-rojo-2.gif'
  image3 = '../../../assets/img/publicidadCupones2.gif'
  contador = new BehaviorSubject<any>(this.image1)
  count: number = 0
  imagenes = [
    { img: this.image2 },
    { img: this.image3 },
    { img: this.image1 }
  ]
  intervalo: any;
  ngOnInit(): void {
    this.cambiodePublicidad()
  }
  cambiodePublicidad() {
    this.intervalo = setInterval(() => {
      if (this.count < this.imagenes.length) {
        this.contador.next(this.imagenes[this.count].img)
        this.count = this.count + 1
      } else {
        this.count = 0
      }
      return
    }, 10000);
    return this.contador.value
  }
}
