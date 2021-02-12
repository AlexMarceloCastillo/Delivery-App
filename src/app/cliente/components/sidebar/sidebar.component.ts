import { Component, OnInit } from '@angular/core';

import { TogglerService } from "../../services/toggler/toggler.service";
import { AuthService } from '../../auth/auth.service';
import { ClienteInterface } from 'src/app/modelos/cliente';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public cliente: ClienteInterface;

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
