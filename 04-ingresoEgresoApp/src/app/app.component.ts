import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  // items$: Observable<any[]>;

  constructor(private authService: AuthService){
    // const aCollection = collection(this.firestore, 'items')
    // this.items$ = collectionData(aCollection);
    this.authService.initAuthListener()
  }


}
