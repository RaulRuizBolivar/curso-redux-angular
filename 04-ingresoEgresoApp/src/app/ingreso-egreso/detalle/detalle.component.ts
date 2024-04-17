import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[];
  ingresosEgresosSubs!: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService){
    this.ingresosEgresos = []
  }

  ngOnInit(): void {
    this.ingresosEgresosSubs = this.store.select('ingresosEgresos').subscribe(({items}) =>  this.ingresosEgresos = items)
  }

  borrar(uid:string | null){
    if(!uid) return
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then((uid) => {
        Swal.fire({
          icon: 'success',
          title: 'Item borrado',
          text: `Item borrado: ${uid}`,
          footer: 'Success'
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: error.name,
          text: error.message,
          footer: error.code
        });
      });
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubs.unsubscribe()
  }

}
