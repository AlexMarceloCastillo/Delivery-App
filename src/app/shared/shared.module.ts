import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientLinksComponent } from './components/links/client-links/client-links.component';
import { AdminLinksComponent } from './components/links/admin-links/admin-links.component';


@NgModule({
  declarations: [ 
    SidebarComponent,
    NavbarComponent,
    ClientLinksComponent,
    AdminLinksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [ 
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
