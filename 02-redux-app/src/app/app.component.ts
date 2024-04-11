import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './contador/contador.actions';
import { AppState } from './app.reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contador!: number;

  constructor( private store : Store<AppState> ){
    this.store.select('contador').subscribe(counter => this.contador = counter)
  }

  incrementar () {
    this.store.dispatch(actions.incrementar())
  }         

  decrementar () {
    this.store.dispatch(actions.decrementar())
  }

}