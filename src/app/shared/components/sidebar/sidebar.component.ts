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
  @Input() isClient: boolean;

  constructor( private togglerService: TogglerService, private cartSvc: CartService ) { }

  ngOnInit(): void { }

  public get toggleStatus() : TogglerService {
    return this.togglerService;
  }

  public onToggle(e:Event): void{
    e.preventDefault();
    this.togglerService.toggle(!this.togglerService.statusSubject.getValue());
  }
}
