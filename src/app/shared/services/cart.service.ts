import { Injectable }                  from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Cart, CartItem }              from "../interfaces/cart.interface";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ items: [] });

  getCart$(): Observable<Cart | undefined> {
    return this.cart$.asObservable();
  }

  add(item: CartItem): void {
    console.log('add ', item);
    const items: CartItem[] = [...this.cart$.value.items];

    const itemInCart: CartItem | undefined = items.find(_item => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart$.next({ items });
  }

  remove(): void {

  }

  checkOut(): void {

  }
}
