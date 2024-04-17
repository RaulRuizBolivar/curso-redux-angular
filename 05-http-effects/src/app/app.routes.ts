import { Routes } from '@angular/router';
import { ListaComponent } from './usuarios/lista/lista.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';

export const routes: Routes = [
    { path:'home', component: ListaComponent },
    { path:'usuario/:id', component: UsuarioComponent },
    { path:'**', redirectTo: 'home' },
];
