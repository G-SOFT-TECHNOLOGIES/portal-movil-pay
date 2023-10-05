import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/components/service/loading.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { EditarService } from '../../services/editar.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent {
  private editar = inject(EditarService)
  private snack = inject(SnackbarService)
  private form = inject(FormBuilder)
  private Loading = inject(LoadingService)

  myForm = this.form.group({
    email:new FormControl('',[Validators.required,Validators.email]),
    name:new FormControl('',[Validators.required]),
    last_name:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.minLength(11)]),
    mobile:new FormControl('',[Validators.required,Validators.minLength(11)])
  })


  ngOnInit(): void {
    this.getCuenta()
    
  }


  getCuenta(){
    this.Loading.showLoading()
    this.editar.getCuenta()
    .then((data) => {
      const [cliente] = data.results
      this.myForm.patchValue({
        email:cliente.email , 
        name: cliente.name, 
        last_name: cliente.last_name , 
        phone: cliente.phone, 
        mobile: cliente.mobile, 
      })
      this.Loading.hideLoading()
    }).catch((err) => {
      this.snack.openSnack(err,'error')
      this.Loading.hideLoading()
    });
  }


  onSubmit(){
    
    const valor = this.myForm.value
    this.editar.EditarCuenta(valor)    
    .then((result) => {
      this.getCuenta()
      this.snack.openSnack('Cuenta editada con exitos','success')
    }).catch((err) => {      
      this.snack.openSnack(err,'error')
    });
  }
}
