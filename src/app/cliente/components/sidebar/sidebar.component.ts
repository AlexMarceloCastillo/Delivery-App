import { Component, OnInit } from '@angular/core';

import { TogglerService } from "../../services/toggler/toggler.service";
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../services/cart/cart.service';

import { Cliente } from 'src/app/core/modelos/cliente.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public cliente: Cliente;

  constructor( private togglerService: TogglerService, private authSvc: AuthService, private cartSvc: CartService ) {
    this.authSvc.getDataClient().subscribe((data)=>{
      this.cliente = data;
    })
  }

  ngOnInit(): void {
  }

  public get toggleStatus() : TogglerService {
    return this.togglerService;
  }

  public onToggle(e:Event): void{
    e.preventDefault();
    this.togglerService.toggle(false);
    e.stopPropagation();
  }

  //Desloguearse
  logOut(){
    this.cartSvc.deleteCart();
    this.authSvc.logOut();
  }
}
