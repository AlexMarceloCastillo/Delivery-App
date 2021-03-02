import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/auth/services/auth.service';

import { Cliente } from '@core/modelos/cliente.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-links',
  templateUrl: './admin-links.component.html',
  styleUrls: ['./admin-links.component.scss']
})
export class AdminLinksComponent implements OnInit {

  // public cliente: Cliente;
  public cliente$: Observable<Cliente>;


  constructor(private authSvc: AuthService) { 
    // this.authSvc.getDataClient().subscribe ( 
    //   data => {
    //     this.cliente = data;
    //     // console.log(this.cliente);
    //   }, 
    //   err => console.error(err)
    // );
    this.cliente$ = this.authSvc.getDataClient();
  }

  ngOnInit(): void { }

  onLogout(): void {
    this.authSvc.logOut();
  }
}