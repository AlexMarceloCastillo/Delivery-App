import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '@auth/services/auth.service';
import { TogglerService } from '../../services/toggler/toggler.service';
import { CartService } from '../../services/cart/cart.service';

import { Subscription } from 'rxjs';

import { Cliente } from '@core/modelos/cliente.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  public cartLength: number = 0;
  private cartSuscription: Subscription;
  public cliente: Cliente;

  constructor( private togglerService: TogglerService, private authSvc: AuthService, private cartSvc: CartService ) {
    this.authSvc.getDataClient().subscribe((data)=>{
      this.cliente = data;
    })
  }


  ngOnInit(): void {
    this.cartSuscription = this.cartSvc.cart$.subscribe( cart => {
      try {
        this.cartLength = cart.reduce((sum,current)=> sum + current.cant,0);
      } catch (error) {
        this.cartLength = 0;
      }
    });
  }


  ngOnDestroy(): void {
    this.cartSuscription.unsubscribe();
  }


  public onToggle(e: Event): void {
    this.togglerService.toggle(true);
    e.preventDefault();
  }

  //Desloguearse
  public logOut(): void{
    this.cartSvc.deleteCart();
    this.authSvc.logOut();
  }
}
