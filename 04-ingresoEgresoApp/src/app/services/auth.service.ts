import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  initAuthListener(){
    this.auth.onAuthStateChanged(user => {
      console.log(user);
      console.log(user?.uid);
      console.log(user?.email);
    })
  }

  crearUsuario(correo:string,password: string){
    return createUserWithEmailAndPassword(this.auth, correo, password);
  }

  loginUsuario(correo:string,password:string){
    return signInWithEmailAndPassword(this.auth,correo,password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(): boolean{
    return Boolean(this.auth.currentUser);
  }
}
