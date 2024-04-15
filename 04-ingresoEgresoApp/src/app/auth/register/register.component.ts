import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit {

  registroForm!: FormGroup;

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private dialogService: DialogService
  ){}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
    })
  }

  crearUsuario(){
    if(this.registroForm.invalid)return;

    this.dialogService.abrirLoading()

    const { correo , password } = this.registroForm.value;
    this.authService.crearUsuario(correo,password)
      .then(response => {
        this.dialogService.cerrarLoading()
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
        this.dialogService.error(error);
      })
  }

}
