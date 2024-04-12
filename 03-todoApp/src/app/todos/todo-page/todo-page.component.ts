import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  allSelected : boolean;

  constructor(){
    this.allSelected = false;
  }

  toggleAll(){
    this.allSelected = !this.allSelected
  }
}
