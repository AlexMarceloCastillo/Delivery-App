import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '@core/auth/guards/admin.guard';
import { AviableGuard } from '@core/auth/guards/aviable.guard';
import { ClosedGuard } from '@core/auth/guards/closed.guard';

import { ClosedComponent } from '@core/pages/closed/closed.component';
import { P404Component } from '@core/pages/p404/p404.component';

import { ClienteComponent } from './cliente/cliente.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    canActivateChild:[AviableGuard],
    children: [
      { path: '', loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule) }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild:[AdminGuard],
    children: [
      { path: '', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule) }
    ]
  },
  {
    path: 'closed',
    component: ClosedComponent,
    canActivate: [ClosedGuard]
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
