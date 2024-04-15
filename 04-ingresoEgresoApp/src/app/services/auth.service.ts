import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.model';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private fireStore : Firestore,
    private store: Store<AppState>
  ) { }

  initAuthListener(){
    this.auth.onAuthStateChanged(firebaseUser => {
      console.log('firebaseUser -->',firebaseUser);
      

      if(firebaseUser){
        const collectionRef = collection(this.fireStore, `${firebaseUser.uid}`);
        const userSub = collectionData(collectionRef) as Observable<Usuario[]>
    
        userSub.pipe(take(1)).subscribe(firestoreUser => {
          const user = Usuario.fromFirebase(firestoreUser[0])
          this.store.dispatch(authActions.setUser({user}));
        })
      }

      if(!firebaseUser) {
        this.store.dispatch(authActions.unSetUser());
      }
  

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
