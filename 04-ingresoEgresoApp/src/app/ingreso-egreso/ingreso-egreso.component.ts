import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

type Tipo = 'ingreso' | 'egreso'

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: ``
})
export class IngresoEgresoComponent implements OnInit , OnDestroy {
  ingresoEgresoForm!: FormGroup;
  tipo :Tipo;
  cargando : boolean;
  cargandoSub !: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ){
    this.cargando = false;
    this.tipo = 'ingreso';
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['',Validators.required],
      monto: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargandoSub = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading)
  }

  guardar(){
    if(this.ingresoEgresoForm.invalid) return;

    this.store.dispatch(ui.isLoading())

    const { descripcion , monto } = this.ingresoEgresoForm.value;

    const ingresoEgreso:IngresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    ?.then(()=>{
      this.ingresoEgresoForm.reset();
      Swal.fire('Registro creado',descripcion,'success')
    })
    .catch(error => Swal.fire('Error', error.message, 'error'))
    .finally(()=> this.store.dispatch(ui.stopLoading()))
  }

  ngOnDestroy(): void {
    this.cargandoSub.unsubscribe()
  }

}
