import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*  Pages */
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
