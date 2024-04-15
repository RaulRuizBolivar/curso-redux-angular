import { getMessaging } from '@angular/fire/messaging';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{

  loginForm !: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private dialogService: DialogService
  ){
    this.loginForm = this.fb.group({
      correo: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {}

  loginUsuario(){

    this.dialogService.abrirLoading()
    
    const {correo , password} = this.loginForm.value;
    this.authService.loginUsuario(correo,password)
    .then(response => {
      this.dialogService.cerrarLoading();
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.log(error);
      this.dialogService.error(error)
    })
  }


}
