import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';

/* Pages */
import { HomeComponent } from "./pages/home/home.component";
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { CartComponent } from './pages/cart/cart.component';
import { ListOrderComponent } from './pages/list-order/list-order.component';
import { OrderComponent } from './pages/order/order.component';
/*  Components   */
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
/*Auth */
import { AuthService } from '../core/auth/services/auth.service';
/*  Guards  */
import { AuthGuard } from '../core/auth/guards/auth.guard';
//
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ClienteComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    CartComponent,
    CarouselComponent,
    ListOrderComponent,
    OrderComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ClienteRoutingModule
  ],
  providers:[ AuthService, AuthGuard ]
})
export class ClienteModule { }
