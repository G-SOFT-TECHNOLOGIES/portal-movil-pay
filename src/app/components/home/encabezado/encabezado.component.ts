import { Component, Input, Pipe } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface encabezado {
  directorio: string
  nombre: string
  extension: string
}


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  @Input() title:string = '*Colocar el titulo*'
  titulo:encabezado = this.getTitulo()

  constructor(private router:ActivatedRoute, private location :Location){
    
  }

  ngOnInit(): void {    
    // console.log(this.location.path());
  }

  getTitulo():encabezado{
    
    const ruta = this.location.path();
    const segmentos = ruta.split('/');

    const ordenado = {
      directorio:segmentos[1],
      nombre: segmentos[2],
      extension: segmentos.length > 3 ? segmentos[3] : ''
    };
    // console.log(ordenado);    
    return ordenado
    // console.log(test);
    

    // let rutaCompleta = this.location.path();
    // let posicionInicio = rutaCompleta.indexOf("finanzas"); 
    // let rutaCortada = rutaCompleta.slice(posicionInicio); 
    // return rutaCortada 
  }  
}
