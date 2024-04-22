import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from 'src/app/components/ajustes/services/ticket.service';
import { CoreService } from 'src/app/components/service/core.service';
import { SnackbarService } from 'src/app/components/service/snackbar.service';
import { UsuarioService } from 'src/app/components/usuario/services/usuario.service';
import { environment } from 'src/environments/enviroments.prod';
import { io } from 'socket.io-client';
type MyType = {
  [key: string]: string[];
};
@Component({
  selector: 'app-dialog-registrar-tickets',
  templateUrl: './dialog-registrar-tickets.component.html',
  styleUrls: ['./dialog-registrar-tickets.component.css']
})
export class DialogRegistrarTicketsComponent {
  private ticket = inject(TicketService);
  private form = inject(FormBuilder);
  private core = inject(CoreService);
  private snack:any = inject(SnackbarService);
  private home = inject(UsuarioService);
  contratos$ = this.home.contractos$;
  user = this.core.getUser();
  issues: any;
  selectedFile: any = null;
  accept: string = '.jpg,.png,.mp4,.pdf,.doc,.docx,.xlsx,.csv,';
  disabled: boolean = false;
  format: any = [];
  myFiles: any[] = [];


  myForm = this.form.group({
    contract: ['', Validators.required],
    departament: ['', Validators.required],
    subject: ['', Validators.required],
    description: ['', Validators.required],
    file: [null],
  });
  urlNotification=environment.API_NOTIFICATION+'/ticketsPortal'
  private socket: any;
  constructor(public dialogRef: MatDialogRef<DialogRegistrarTicketsComponent>) {
    this.socket = io(this.urlNotification, { transports: ['websocket'] });

  }

  ngOnInit(): void {
    this.home.getContratos();
    console.log(this.urlNotification);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getIssues(event: any) {
    this.ticket
      .getIssues(event.value)
      .then((res) => {
        this.issues = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSubmit() {
    const input = document.getElementById('submit') as HTMLInputElement | null;
    input?.setAttribute('disabled', '');

    const valor = this.myForm.value;
    const body = {
      client: this.user.id,
      contract: valor.contract,
      issue: valor.subject,
      description: valor.description,
      office: valor.departament,
      files: this.format,

    };
    this.ticket
      .postMethod(body)
      .then((result:any) => {
        console.log(result);
        this.ticket.createNotification(result.id).then((resp:any)=>{
          this.notificarTicket(result)
          this.snack.openSnack('Ticket registrado con exito', 'success');
          input?.removeAttribute('disabled');
          this.dialogRef.close(true)
        })
       
      })
      .catch((err:any) => {
        if (err.status == 400) {
          console.log(err.status)
          console.log(err[0])
          this.snack.openSnack(err.error[0]);
        }
        console.log(err);
        return 
        input?.removeAttribute('disabled');
        console.log(err);
      });
  }

  onFileSelected(event: Event, fileType: string): void {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file)

    this.selectedFile = file ?? null;
    this.myFiles.push(file)

    const reader = new FileReader();
    reader.onload = (evt) => {
      const val: any = evt.target?.result
      // console.log(val)
      const value2= val.replace(`data:${file.type};base64,`, "")
      let base64 = [val];
      let format2: any = file.name.split('.').pop();
      const obj: MyType = { [format2]: base64 };
      this.format.push(obj)
      // this.disabled = true;
    };
    reader.readAsDataURL(file)
  }
  // resetFile():void{
    
  //   this.selectedFile = '';
  //   this.format = [];
  //   this.disabled = false;

  // }
  resetFile(indice: number): void {
    this.format = this.format.filter((fil: string, i: number) => i !== indice)
    this.myFiles = this.myFiles.filter((fil: string, i: number) => i !== indice)
  }
  notificarTicket(ticket:any){
    console.log('notificandoPortal');
    const token=localStorage.getItem('token') ?? '';
    const body={
      ticket:ticket,
      token: token 
    }
    console.log(body);
    
    this.socket.emit('nuevoTicketPortal', body);
  }
  ngOnDestroy() {
    this.socket.disconnect();
    
  }
}
