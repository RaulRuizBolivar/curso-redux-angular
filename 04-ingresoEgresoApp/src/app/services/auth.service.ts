import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  crearUsuario(correo:string,password: string){
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  loginUsuario(correo:string,password:string){
    return signInWithEmailAndPassword(this.auth,correo,password);
  }

  logout(){
    return this.auth.signOut();
  }
}
