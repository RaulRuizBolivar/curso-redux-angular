import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: ``
})
export class EstadisticaComponent implements OnInit {

  ingresos:number;
  egresos:number;

  totalIngresos:number;
  totalEgresos:number;

  // Grafica
  chartData: ChartData<'doughnut'> = {
    labels: [
      'Ingresos','Egresos'
    ],
    datasets: [
      { data: [] },
    ],
  };



  constructor(private store: Store<AppState>){
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.generarEstadistica(items)
    })
  }

  resetDatos(){
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
  }

  generarEstadistica(items : IngresoEgreso[]){
    this.resetDatos();
    for(const item of items){
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.chartData.datasets[0].data = [this.totalIngresos,this.totalEgresos]
  }

}
