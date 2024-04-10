import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contador: number;

  constructor(){
    this.contador = 10
  }

  incrementar () {
    this.contador++;
  }         

  decrementar () {
    this.contador--;
  }

}