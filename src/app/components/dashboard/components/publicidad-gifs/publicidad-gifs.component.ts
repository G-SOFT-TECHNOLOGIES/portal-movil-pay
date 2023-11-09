import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-publicidad-gifs',
  templateUrl: './publicidad-gifs.component.html',
  styleUrls: ['./publicidad-gifs.component.css']
})
export class PublicidadGifsComponent {
  image1 = '../../../assets/img/fondo-2.gif'
  image2 = '../../../assets/img/proximamente-blanco-rojo.gif'
  contador = new BehaviorSubject<string>(this.image1)
  intervalo: any;
  ngOnInit(): void {
    // this.cambiodePublicidad()
  }
  // cambiodePublicidad() {
  //   this.intervalo = setInterval(() => {
  //     if (this.contador.value == this.image1) {
  //       this.contador.next(this.image2);
  //     } else {
  //       this.contador.next(this.image1);
  //     }
  //   }, 10000);
  //   return this.contador.value
  // }
}
