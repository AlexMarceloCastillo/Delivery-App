import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

/*  pages */
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './admin.component';
/*  Components   */

/*  Guards  */
import { AdminGuard } from '@core/auth/guards/admin.guard';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    AdminComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule
  ],
  providers: [ AdminGuard ]
})
export class AdminModule { }