import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { validFilter } from '../../types/validFilter.type';
import * as actionsFilter from '../../filter/filter.actions';
import * as actionsTodo from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent implements OnInit {

  actualFilter : validFilter = 'all'
  filters : validFilter[] = ['all','completed','pending']
  pending : number = 0;

  constructor(private store : Store<AppState>){

  }

  ngOnInit(): void {
    // this.store.select('filter').subscribe(filter => this.actualFilter = filter)
    this.store.subscribe(state => {
      this.actualFilter = state.filter;
      this.pending = state.todos.filter(todo => !todo.completed).length
    })
  }

  changeFilter(filter: validFilter){
    this.store.dispatch(actionsFilter.setFilter({filter}))
  }

  clearCompleted(){
    this.store.dispatch(actionsTodo.clearCompleted())
  }

}
