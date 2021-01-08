import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
/* Pages */
import { HomeComponent } from "./pages/home/home.component";
import { MenuComponent } from './pages/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { CartComponent } from './pages/cart/cart.component';


@NgModule({
  declarations: [ 
    ClienteComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
