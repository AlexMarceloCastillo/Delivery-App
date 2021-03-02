import { Component, OnChanges, OnInit } from '@angular/core';

import { AuthService } from '@core/auth/services/auth.service';

import { Cliente } from '@core/modelos/cliente.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-links',
  templateUrl: './client-links.component.html',
  styleUrls: ['./client-links.component.scss']
})
export class ClientLinksComponent implements OnInit {

  public cliente$: Observable<Cliente>;

  constructor(private authSvc: AuthService) {
    this.cliente$ = this.authSvc.getDataClient();
  }

  ngOnInit(): void { }

  onLogout(): void {
    this.authSvc.logOut();
  }
}