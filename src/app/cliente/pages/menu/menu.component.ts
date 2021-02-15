import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart/cart.service';

import { ItemCart } from '@core/modelos/itemCart.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public foods:any[] = [
    {
      id:'001',
      name:"food 01",
      img: "https://place-hold.it/500x300",
      price:100,
    },
    {
      id:'002',
      name:"food 02",
      img: "https://place-hold.it/500x300",
      price:250
    },
    {
      id:'003',
      name:"food 03",
      img: "https://place-hold.it/500x300",
      price:300
    },
    {
      id:'004',
      name:"food 04",
      img: "https://place-hold.it/500x300",
      price:145
    },
    {
      id:'005',
      name:"food 05",
      img: "https://place-hold.it/500x300",
      price:400
    },
    {
      id:'006',
      name:"food 06",
      img: "https://place-hold.it/500x300",
      price:350
    }
  ];

  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
  }

  public addItemCart(item: any, e: Event): void {
    e.preventDefault();
    let cartItem: ItemCart = {
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      cant: 1
    }
    this.cartSvc.addItem(cartItem);
    e.stopPropagation();
  }
}