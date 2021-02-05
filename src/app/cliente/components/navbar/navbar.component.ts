import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { TogglerService } from '../../services/toggler/toggler.service';
import { AuthService } from '../../auth/auth.service';
import { ClienteInterface } from 'src/app/modelos/cliente';
import { CartService } from '../../services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public cartLength: number = 0;
  private cartSuscription: Subscription;
  public cliente: ClienteInterface;

  constructor( private togglerService: TogglerService, private authSvc: AuthService, private cartSvc: CartService ) {
    this.authSvc.getDataClient().subscribe((data)=>{
      this.cliente = data;
    })
  }


  ngOnInit(): void {
    this.cartSuscription = this.cartSvc.cart$.subscribe( cart => {
      this.cartLength = cart.reduce((sum,current)=> sum + current.cant,0)
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
  logOut(){
    this.authSvc.logOut();
  }
}
