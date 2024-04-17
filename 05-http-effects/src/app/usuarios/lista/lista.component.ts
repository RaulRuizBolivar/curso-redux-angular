import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent implements OnInit{
  // Properties
  usuarios: Usuario[] = []

  // Injects
  private usuarioService = inject(UsuarioService)

  ngOnInit(): void {
    this.usuarioService.getUser().subscribe(users => {
      this.usuarios = users
    })
  }

}
