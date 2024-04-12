import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit {
  @Input() todo : Todo  = new Todo('');
  @ViewChild('input') input !: ElementRef;

  chkCompleted : FormControl<boolean | null>;
  txtInput : FormControl<string | null>;

  editing : boolean;

  constructor(private store : Store<AppState>){
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text , Validators.required);
    this.editing = false;
  }

  ngOnInit(): void {
    this.chkCompleted.valueChanges.subscribe(value => {
      this.store.dispatch(actions.toggle({id:this.todo.id}))
    })
  }

  edit(){
    this.editing = true;
    this.txtInput.setValue(this.todo.text)

    setTimeout(()=>{
      this.input.nativeElement.select()
    },1)
  }

  finishEdit(){
    this.editing = false;
    const exist = this.txtInput.invalid || this.txtInput.value === this.todo.text
    if(exist)return;
    console.log('edit --->', this.todo);
    
    this.store.dispatch(actions.edit({
      id : this.todo.id,text: this.input.nativeElement.value
    }))
  }

  remove(){
    this.store.dispatch(actions.remove({id:this.todo.id}))
  }

}
