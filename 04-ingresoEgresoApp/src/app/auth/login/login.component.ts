import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit , OnDestroy{

  loginForm !: FormGroup;
  cargando: boolean;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private dialogService: DialogService,
    private store: Store<AppState>
  ){
    this.loginForm = this.fb.group({
      correo: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]]
    })
    this.cargando = false;
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
                            .subscribe(ui=> this.cargando = ui.isLoading)
  }

  loginUsuario(){

    this.store.dispatch(ui.isLoading())
    
    const {correo , password} = this.loginForm.value;
    this.authService.loginUsuario(correo,password)
    .then(() => {
      this.store.dispatch(ui.stopLoading())
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.log(error);
      this.store.dispatch(ui.stopLoading())
      this.dialogService.error(error)
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }


}
