import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';


const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      { path: '', loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
