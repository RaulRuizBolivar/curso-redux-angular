import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Actions from '../todo.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  allSelected : boolean;

  constructor(private store : Store<AppState>){
    this.allSelected = false;
  }

  toggleAll(){
    this.allSelected = !this.allSelected;
    this.store.dispatch(Actions.toggleAll({allSelected: this.allSelected}))
  }
}
