import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './pages/cart/cart.component';

import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil/:id', component: PerfilComponent,canActivate:[AuthGuard] },
  { path: 'cart', component: CartComponent,canActivate:[AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
