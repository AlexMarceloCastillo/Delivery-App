import { Component, Input, OnInit } from '@angular/core';

import { TogglerService } from "../../services/toggler/toggler.service";
import { CartService } from '../../../cliente/services/cart/cart.service';

import { AuthService } from '@core/auth/services/auth.service';

import { Cliente } from '@core/modelos/cliente.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public cliente: Cliente;
  public role: number;

  @Input() isDashboard: boolean;

  constructor( private togglerService: TogglerService, private authSvc: AuthService, private cartSvc: CartService ) {
    this.authSvc.getDataClient().subscribe((data)=>{
      this.cliente = data;
      this.role  = data.role;
    }, err => console.error(err));
  }

  ngOnInit(): void { }

  public get toggleStatus() : TogglerService {
    return this.togglerService;
  }

  public onToggle(e:Event): void{
    e.preventDefault();
    this.togglerService.toggle(!this.togglerService.statusSubject.getValue());
  }

  //Desloguearse
  logOut(){
    this.cartSvc.deleteCart();
    this.authSvc.logOut();
  }
}
