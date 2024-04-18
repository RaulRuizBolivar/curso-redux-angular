import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { cargarUsuario } from '../../store/actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  usuario ?: Usuario;

  constructor(
    private router: ActivatedRoute,
    private store : Store<AppState>
  ){}

  ngOnInit(): void {
    this.store.select('usuario').subscribe(({user}) => {
      this.usuario = user
    })

    this.router.params.subscribe(({id}) => {
      this.store.dispatch(cargarUsuario({ id }))
    })
  }

}
