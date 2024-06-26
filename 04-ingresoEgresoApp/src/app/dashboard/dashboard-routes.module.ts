import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const rutasHijas: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [ authGuard ]
  },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutesModule { }
