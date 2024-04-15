import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  constructor(
    private authService:AuthService,
    private router: Router,
    private dialogService: DialogService
  ){}

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
