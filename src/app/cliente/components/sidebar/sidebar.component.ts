import { Component, OnInit } from '@angular/core';

import { TogglerService } from "../../services/toggler/toggler.service";
import { AuthService } from '../../auth/auth.service';
import { ClienteInterface } from 'src/app/modelos/cliente';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public cliente: ClienteInterface;

  constructor( private togglerService: TogglerService, private authSvc: AuthService ) {
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
    this.authSvc.logOut();
  }
}
