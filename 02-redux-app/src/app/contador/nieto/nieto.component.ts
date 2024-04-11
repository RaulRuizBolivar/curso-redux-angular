import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as Actions from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: ``
})
export class NietoComponent implements OnInit {
  contador !: number;

  constructor(private store : Store<AppState>){}

  ngOnInit(): void {
    this.store.select('contador').subscribe( counter => this.contador = counter)
  }

  reset(){
    this.store.dispatch(Actions.reset())
  }
}
