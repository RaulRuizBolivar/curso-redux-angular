import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

const components = [
  SidebarComponent,
  NavbarComponent,
  FooterComponent
]


@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[components]
})
export class SharedModule { }
