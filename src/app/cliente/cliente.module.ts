import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';

import { ReactiveFormsModule } from "@angular/forms";

/* Pages */
import { HomeComponent } from "./pages/home/home.component";
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
/*  Components   */
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './pages/cart/cart.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
/*Auth */
import { AuthService } from '../core/auth/services/auth.service';
import { AuthGuard } from '../core/auth/guards/auth.guard';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { OrderComponent } from './pages/order/order.component';

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
    CartComponent,
    SidebarComponent,
    CarouselComponent,
    ListOrderComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ AuthService, AuthGuard ]
})
export class ClienteModule { }
