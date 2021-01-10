import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TogglerService } from '../../services/toggler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private togglerService: TogglerService ) { }

  ngOnInit(): void {
  }

  public onToggle(e: Event): void {
    this.togglerService.toggle(true);
    e.preventDefault();
  }
}
