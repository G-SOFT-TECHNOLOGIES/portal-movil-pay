import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogActivarComponent } from '../../dialog-activar/dialog-activar.component';
import { DialogRecuperarComponent } from '../../dialog-recuperar/dialog-recuperar.component';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  private auth = inject(LoginService)
  private form = inject(FormBuilder);
  private dialog = inject(MatDialog)

  hide = true

  formLogin = this.form.group({
    // indicador: ['V', Validators.required],
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  });

  setLogin() {
    const valor = this.formLogin.value
    const body = {
      // "identification": `${valor.indicador}${valor.user}`,
      "email": `${valor.user}`,
      "password": valor.pass
    }
    this.auth.login(body)
  }
  activar() {
    this.dialog.open(DialogActivarComponent)
  }
  recuperar() {
    this.dialog.open(DialogRecuperarComponent)
  }

}
