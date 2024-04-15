import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.model';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, public fireStore : Firestore) { }

  initAuthListener(){
    this.auth.onAuthStateChanged(user => {
      console.log(user);
      console.log(user?.uid);
      console.log(user?.email);
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
