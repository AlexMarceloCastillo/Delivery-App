import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

import { CartService } from '../../services/cart/cart.service';
import { ItemCart } from "../../../modelos/ItemCart";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit,OnDestroy {

  // public widthFormat = 320;
  public widthFormat:number;

  private resizeObservable$: Observable<Event>;
  public resizeSubscription$: Subscription;

  public cards:any[] = [
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
  ]

  cardItemA: any[];
  cardItemB: any[];

  constructor( private cartSvc:CartService ) { 
    if (window.innerWidth >= 320 && window.innerWidth <=1024) {
      this.widthFormat = window.innerWidth;
    } else {
      this.widthFormat = window.innerWidth;
    }
  }
  
  ngOnInit(): void {
    [ this.cardItemA , this.cardItemB ] = this.splitArray(this.cards);

    this.resizeObservable$ = fromEvent(window,'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment     
      // @ts-ignore
      this.widthFormat = evt.currentTarget.screen.width;
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  /**
   * Agrega productos al carritos
   * @param item 
   */
  public addItemCart(item: any,e:Event) {
    e.preventDefault();
    let cartItem: ItemCart = {
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      cant: 1
    }
    this.cartSvc.addItem(cartItem);
  }

  /**
   * Metodo que divide un array en dos
   * (Sujeto a modificaciones)
   * @param array 
   */
  private splitArray(array:any[]):any[] {
    let half = Math.ceil(array.length / 2);
    let aux = [...this.cards]
    let arrayA = aux.splice(0,half);
    let arrayB = aux.splice(-half);
    return [ arrayA,arrayB ];
  }
}