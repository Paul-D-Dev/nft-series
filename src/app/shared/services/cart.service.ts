import { Injectable }                  from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { CardNFT, Cart }               from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ items: [] });

  getCart$(): Observable<Cart | undefined> {
    return this.cart$.asObservable();
  }

  add(item: CardNFT): void {
    const items: CardNFT[] = [...this.cart$.value.items];

    const itemInCart: CardNFT | undefined = items.find(_item => _item.id === item.id);
    if (!itemInCart) {
      items.push(item);
      this.cart$.next({ items });
    } else {
      // TODO alert user the item is already in the cart
    }

  }

  remove(item: CardNFT): void {
    const filteredItems = this.cart$.value.items.filter(_item => _item.id !== item.id);
    this.cart$.next({ items: filteredItems });
  }

  checkOut(): void {

  }
}
