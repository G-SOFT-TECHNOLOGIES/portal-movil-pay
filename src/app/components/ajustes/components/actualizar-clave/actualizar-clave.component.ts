import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ActualizarService } from '../../services/actualizar.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-clave',
  templateUrl: './actualizar-clave.component.html',
  styleUrls: ['./actualizar-clave.component.css']
})
export class ActualizarClaveComponent {
  private snack = inject(SnackbarService)
  private router = inject(Router)

  valido: boolean = false
  isLinear = true;
  hide = true;


  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  private actualizar = inject(ActualizarService)

  validar = new FormGroup({
    contraseña: new FormControl('', Validators.required),
    contraseña2: new FormControl('', Validators.required)
  })
  nueva =  new FormGroup({
    contraseña: new FormControl('', Validators.required),
    contraseña2: new FormControl('', Validators.required),
  })
  onSubmit() {
    const valor = this.validar.value
    if (valor.contraseña !== valor.contraseña2) {
      return this.snack.openSnack('La Contraseñas no coinciden', 'error')
    }
    this.actualizar.validatePass(valor.contraseña ?? '')
      .then((result) => {
        console.log(result)
        this.valido = true
      }).catch((err) => {
        this.snack.openSnack(err, 'error')
      });

  }
  updatePassword(){
    const valor= this.nueva.value
    if (valor.contraseña !== valor.contraseña2) {
      return this.snack.openSnack('La Contraseñas no coinciden','error')
    }    
    this.actualizar.setPassword(valor.contraseña??'')
    .then((result) => {  
      this.snack.openSnack('Contraseña Actualizada con exito','success')
      this.router.navigate([`home/ajustes`])
        }).catch((err) => {
      this.snack.openSnack(err,'error')
    });
    
  }

}
