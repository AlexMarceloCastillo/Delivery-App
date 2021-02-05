import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ItemCart } from "../../../modelos/ItemCart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartBS = new BehaviorSubject<Array<ItemCart>>([]);
  public cart$ = this.cartBS.asObservable();

  constructor() { }

  public addItem(item: ItemCart) {
    let currentCart = this.cartBS.getValue();
    if(currentCart) {
      let objIndex = currentCart.findIndex( (obj) => obj.id == item.id );

      if(objIndex != -1) {
        currentCart[objIndex].cant += 1;
      } else {
        currentCart.push(item)
      }
    } else {
      currentCart = []; // Iniciamos el carrito
      currentCart.push(item);
    }
    
    
    this.cartBS.next(currentCart);
    console.log('service: ',this.cartBS.getValue());
  }

  public removeItem(item: ItemCart) {
    let currentCart = this.cartBS.getValue();

    if(currentCart) {
      let objId = currentCart.findIndex( (obj) => obj.id == item.id);

      if(currentCart[objId].cant >=2 ) {
        currentCart[objId].cant-=1;
      } else {
        this.deleteItem(item.id);
      }
    }
    this.cartBS.next(currentCart);
  }

  public deleteItem(itemId:any) {
    let currentCart = this.cartBS.getValue();
    let objIndex = currentCart.findIndex( (obj) => obj.id == itemId );

    if(objIndex != -1) {
      currentCart[objIndex].cant = 1;
      currentCart.splice(objIndex,1);
    }

    this.cartBS.next(currentCart);
  }

  public deleteCart():void {
    this.cartBS.next(null);
  }
}
