import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as Actions from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: ``
})
export class HijoComponent implements OnInit {
  contador !: number;

  constructor(private store : Store<AppState>){}


  ngOnInit(): void {
    this.store.select('contador').subscribe(counter => this.contador = counter)
  }

  multiplicar(){
    this.store.dispatch(Actions.multiplicar({numero: 3}))
  }

  dividir(){
    this.store.dispatch(Actions.dividir({numero : 3}))
  }

}
