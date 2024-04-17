import { Injectable } from '@angular/core';
import { Firestore, doc, collection, setDoc, docSnapshots, collectionChanges, collectionSnapshots } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { deleteDoc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso( ingresoEgreso:IngresoEgreso ){
    if(!this.authService.user) return
    const  uid  = this.authService.user.uid;
    const collectionIngresoEgreso = collection(this.firestore, `${uid}/ingreso-egreso/items`);
    const documentRef = doc(collectionIngresoEgreso);
    return setDoc(documentRef, { ...ingresoEgreso })
  }

  initIngresosEgresosListener(uid: string) {
    return collectionSnapshots(
      collection(this.firestore, uid, 'ingreso-egreso/items')
    ).pipe(
        map((items) =>
            items.map((item) => {
                const data = item.data();
                const uid = item.id;
                return { ...data, uid } as IngresoEgreso;
            })
        )
      )
  }

  borrarIngresoEgreso(uidItem:string){
    const uidUser = this.authService.user?.uid ?? '';
    return deleteDoc(
      doc(
        this.firestore,
        `${uidUser}`,
        'ingreso-egreso',
        'items',
        `${uidItem}`,
    )
  );
  }
}
