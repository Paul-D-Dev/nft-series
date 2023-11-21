import { Injectable }                            from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { CardNFT, Cart }                         from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ items: [] });

  getCart$(): Observable<Cart | undefined> {
    return this.cart$.asObservable().pipe(tap(console.log));
  }

  getTotalCart$(): Observable<any> {
    return this.cart$.asObservable().pipe(
      map(cart => cart.items.map(item => item.price).reduce((prev, current) => prev + current, 0)))
  }

  add(item: CardNFT): void {
    const items: CardNFT[] = [...this.cart$.value.items];

    const itemInCart: CardNFT | undefined = items.find(_item => _item.id === item.id);
    if (!itemInCart) {
      console.log('item add')
      items.push(item);
      this.cart$.next({ items });
    } else {
      console.error('item can not add')
      // TODO alert user the item is already in the cart
    }

  }

  remove(item: CardNFT): void {
    const filteredItems = this.cart$.value.items.filter(_item => _item.id !== item.id);
    this.cart$.next({ items: filteredItems });
  }

  clearAll(): void {
    this.cart$.next({ items: [] });
  }


  checkOut(): void {

  }
}
