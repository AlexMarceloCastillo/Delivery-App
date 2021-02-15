import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P404Component } from '@core/pages/p404/p404.component';

import { ClienteComponent } from './cliente/cliente.component';


const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      { path: '', loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule) }
    ]
  },
  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
