import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: ``
})
export class NietoComponent {
  @Input() contador !: number;
  @Output() cambioContador = new EventEmitter<number>()

  constructor(){}

  reset(){
    this.contador = 0
    this.cambioContador.emit(this.contador)
  }
}
