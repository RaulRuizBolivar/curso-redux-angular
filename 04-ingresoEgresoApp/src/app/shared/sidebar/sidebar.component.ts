import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit {

  nombreUsuario ?: string = '';

  constructor(
    private authService:AuthService,
    private router: Router,
    private dialogService: DialogService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select('auth').pipe(filter(({user})=> user != null)).subscribe(({user})=>{
      this.nombreUsuario = user?.nombre
    })
  }

  logout(){
    this.dialogService.abrirLoading()
    this.authService.logout()
    .then(() => {
      this.dialogService.cerrarLoading()
      this.router.navigate(['/login']);
    })
    .catch(error => {
      this.dialogService.error(error);
    });
  }
}
