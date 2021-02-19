import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  
  public userId:string = 'DUa0zPcgCjZwzoruJOhhQlNGtLy1';
  public orders = [
    {
      id:"1234",
      estado: "Listo"
    },
    {
      id:"9254",
      estado: "Listo"
    },
    {
      id:"7234",
      estado: "cocina"
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }


  imprimir(id:string, e:Event): void {
    e.preventDefault();
    e.stopPropagation();

    alert(`Imprimiendo factura ${id}`);
  }
}
