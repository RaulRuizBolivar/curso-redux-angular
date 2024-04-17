import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.model';
import { CollectionReference, Firestore, collection, collectionChanges, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Observable } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Usuario | null = null;

  get user() : Usuario | null{
    return this._user;
  }

  constructor(
    private auth: Auth,
    private fireStore : Firestore,
    private store: Store<AppState>
  ) { }

  initAuthListener(){
    this.auth.onAuthStateChanged(firebaseUser => {

      if(firebaseUser){
        const collectionRef = collection(this.fireStore, `${firebaseUser.uid}`);
        const userSub = collectionData(collectionRef)

        userSub.subscribe(firestoreUser => {
          const user = Usuario.fromFirebase(firestoreUser[0])
          this._user = user;
          this.store.dispatch(authActions.setUser({user}));
        })
      }

      if(!firebaseUser) {
        this._user = null;
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresoEgresoActions.unSetItems())
      }

    })
  }

  crearUsuario(correo:string,password: string, nombre: string){
    return createUserWithEmailAndPassword(this.auth, correo, password)
      .then(firebaseUser=>{
        const newUser = new Usuario(firebaseUser.user.uid, nombre, correo);
        const collectionRef = collection(this.fireStore, `${firebaseUser.user.uid}`)
        const documentRef = doc(collectionRef, 'user');
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
