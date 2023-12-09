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
  image3 = '../../../assets/img/publicidadCupones.gif'
  contador = new BehaviorSubject<string>(this.image1)
  intervalo: any;
  ngOnInit(): void {
    this.cambiodePublicidad()
  }
  cambiodePublicidad() {
    this.intervalo = setInterval(() => {
      if (this.contador.value == this.image1) {
        this.contador.next(this.image2 || this.image3);
      } else {
        this.contador.next(this.image1 );
      }
    }, 10000);
    return this.contador.value
  }
}
