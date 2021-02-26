import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*  Pages */
import { UsersComponent } from './pages/users/users.component';
import { ChartsComponent } from './pages/charts/charts.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '', redirectTo: 'charts', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
