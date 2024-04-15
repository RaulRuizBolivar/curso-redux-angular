import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  uiSubscription!: Subscription;
  cargando: boolean;

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private dialogService: DialogService,
    private store: Store<AppState>
  ){
    this.cargando = false;
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui')
                            .subscribe(ui=> this.cargando = ui.isLoading)
  }

  crearUsuario(){
    if(this.registroForm.invalid)return;

    this.store.dispatch(ui.isLoading());

    const { correo , password, nombre } = this.registroForm.value;
    this.authService.crearUsuario(correo,password,nombre)
      .then(response => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log(error);
        this.store.dispatch(ui.stopLoading());
        this.dialogService.error(error);
      })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
