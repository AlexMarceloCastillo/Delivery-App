import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//FireBaseModules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

//Toast
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from "@angular/forms";

// @core: Pages
import { P404Component } from '@core/pages/p404/p404.component';
import { ClosedComponent } from '@core/pages/closed/closed.component';
import { AviableGuard } from '@core/auth/guards/aviable.guard';
import { ClosedGuard } from '@core/auth/guards/closed.guard';

@NgModule({
  declarations: [
    AppComponent,
    P404Component,
    ClosedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AviableGuard,ClosedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
