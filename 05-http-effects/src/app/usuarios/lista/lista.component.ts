import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { cargarUsuarios } from '../../store/actions';
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule,JsonPipe],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent implements OnInit{
  // Properties
  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  // Injects
  private store = inject(Store<AppState>)

  constructor(){}

  ngOnInit(): void {
    this.store.select('usuarios').subscribe(({users,loading,error})=> {
      this.usuarios = users;
      this.loading  = loading;
      this.error    = error
    } )

    this.store.dispatch(cargarUsuarios())
  }

}
