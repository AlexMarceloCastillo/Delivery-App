import { Component, OnInit } from '@angular/core';

import { TogglerService } from "../../services/toggler.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private togglerService: TogglerService ) { }

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
}
