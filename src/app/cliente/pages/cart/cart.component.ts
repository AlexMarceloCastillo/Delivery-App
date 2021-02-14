import { Component, OnInit } from '@angular/core';

import { ItemCart } from 'src/app/core/modelos/ItemCart.interface';
import { CartService } from "../../services/cart/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public total:number;
  public subTotal:number;
  public itemsCart: ItemCart[];
  public sessionCart: ItemCart[];

  constructor( private cartSvc:CartService ) { }


  ngOnInit(): void {
    this.cartSvc.cart$.subscribe( cart => {
      try {
        this.itemsCart = cart;
        this.subTotal = cart.reduce( (sum, current) => sum + (current.price*current.cant),0);
      } catch (error) {
        this.subTotal = 0;
      }
    });
    this.sessionCart = JSON.parse(sessionStorage.getItem('cart'));
  }


  /**
   * Elimina un item del carrito permanentemente
   * @param id: Id de un elemento
   * @param e: Event
   */
  public deleteItemCart(id: any,e:Event) {
    e.preventDefault();
    this.cartSvc.deleteItem(id);
  }

  /**
   * Aumenta la cantidad de un item en el carrito
   * @param item: ItemCart
   * @param e: Event
   */
  public plus(item:ItemCart,e:Event): void{
    e.preventDefault();
    e.stopPropagation();
    this.cartSvc.addItem(item);
  }

  /**
   * Disminuye la cantidad de un item en el carrito
   * @param item: ItemCart
   * @param e: Event
   */
  public minus(item:ItemCart,e:Event): void{
    e.preventDefault();
    e.stopPropagation();
    this.cartSvc.removeItem(item);
  }
}
