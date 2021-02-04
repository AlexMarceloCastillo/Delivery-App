import { Component, OnInit } from '@angular/core';

import { TogglerService } from '../../services/toggler.service';
import { AuthService } from '../../auth/auth.service';
import { ClienteInterface } from 'src/app/modelos/cliente';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cliente: ClienteInterface;

  constructor( private togglerService: TogglerService, private authSvc: AuthService ) {
    this.authSvc.getDataClient().subscribe((data)=>{
      this.cliente = data;
    })
  }

  ngOnInit(): void {
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
