import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items:object[] = [
    {
      name:"food 01",
      img: "https://place-hold.it/500x300",
      price:100,
    },
    {
      name:"food 02",
      img: "https://place-hold.it/500x300",
      price:250
    },
    {
      name:"food 03",
      img: "https://place-hold.it/500x300",
      price:300
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
