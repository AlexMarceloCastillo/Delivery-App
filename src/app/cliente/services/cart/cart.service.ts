import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ItemCart } from "../../../core/modelos/ItemCart.interface";
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartBS = new BehaviorSubject<Array<ItemCart>>([]);
  public cart$ = this.cartBS.asObservable();

  constructor(private auth: AuthService) { 
    let auxCart = JSON.parse(sessionStorage.getItem('cart'));
    if(this.auth.isAuth && (auxCart !== null) ){
      this.cartBS.next(auxCart);
    }
  }

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
      currentCart = [];
      currentCart.push(item);
    }

    this.persistCart(currentCart);
  }

  private persistCart(cart: ItemCart[]): void {
    this.cartBS.next(cart);
    if(this.auth.isAuth && (this.cartBS.getValue().length >= 0)) {
      sessionStorage.setItem('cart' , JSON.stringify(this.cartBS.getValue()));
    }
  }

  public removeItem(item: ItemCart): void{
    let currentCart = this.cartBS.getValue();

    if(currentCart) {
      let objId = currentCart.findIndex( (obj) => obj.id == item.id);

      if(currentCart[objId].cant >=2 ) {
        currentCart[objId].cant-=1;
      } else {
        this.deleteItem(item.id);
      }
    }
    this.persistCart(currentCart);
  }

  public deleteItem(itemId: ItemCart): void {
    let currentCart = this.cartBS.getValue();
    let objIndex = currentCart.findIndex( (obj) => obj.id == itemId );

    if(objIndex != -1) {
      currentCart[objIndex].cant = 1;
      currentCart.splice(objIndex,1);
    }
    this.persistCart(currentCart);
  }

  public deleteCart(): void {
    this.cartBS.next(null);
    sessionStorage.removeItem('cart');
  }
}
// https://www.sebastianbauer.dev/2019/12/11/carrito-reactivo-con-angular-y-rxjs/ (referencia)