import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoAction from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit, OnDestroy{

  userSubs!: Subscription;
  ingresoEgresoSubs!: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService){}

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
                      .pipe(filter( auth => auth.user !== null && auth.user.uid !== undefined))
                      .subscribe(({user})=> {
                        if(user === null) return;
                        this.ingresoEgresoSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid).subscribe(ingresosEgresosFB => {
                          this.store.dispatch(ingresoEgresoAction.setItems({items:ingresosEgresosFB}))
                        })
                      })
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubs?.unsubscribe()
    this.userSubs?.unsubscribe()
  }

}
