import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    const listItems = [...items]
    const sortedList = listItems.sort((a)=>{
      if(a.tipo === 'egreso') return 1;
      return -1
    });
    return sortedList
  }

}
