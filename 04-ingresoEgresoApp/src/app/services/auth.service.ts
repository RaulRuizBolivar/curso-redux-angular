import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.model';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    public fireStore : Firestore,
    public store: Store<AppState>
  ) { }

  initAuthListener(){
    this.auth.onAuthStateChanged(firebaseUser => {
      if(!firebaseUser) return
      // this.store.dispatch(authActions.setUser({}))
    })
  }

  crearUsuario(correo:string,password: string, nombre: string){
    return createUserWithEmailAndPassword(this.auth, correo, password)
      .then(firebaseUser=>{
        const newUser = new Usuario(firebaseUser.user.uid, nombre, correo);
        const collectionRef = collection(this.fireStore, `${firebaseUser.user.uid}`)
        const documentRef = doc(collectionRef, 'user');
        console.log(documentRef,newUser);
        setDoc(documentRef,{...newUser})
      })
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
