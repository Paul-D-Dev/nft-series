import { animate, style, transition, trigger }           from '@angular/animations';
import { DialogRef }                                     from '@angular/cdk/dialog';
import { CommonModule }                                  from '@angular/common';
import { Component }                                     from '@angular/core';
import { MatButtonModule }                               from '@angular/material/button';
import { MatIconModule }                                 from '@angular/material/icon';
import { MatListModule }                                 from '@angular/material/list';
import { Icons }                                         from '../../enums';
import { CartService }                                   from "../../services/cart.service";
import { Observable }                                    from "rxjs";
import { CardNFT }                                       from "../../interfaces";
import { Store }                                         from "@ngrx/store";
import { CartActions, selectCart, selectTotalValueCart } from "../../store/cart";
import { AppState }                                      from "../../store";
import { LetDirective }                                  from "@ngrx/component";

const slideInOutAnimationTime = 150;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatListModule, LetDirective],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(slideInOutAnimationTime, style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(slideInOutAnimationTime, style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CartComponent {
  constructor(public dialogRef: DialogRef, private cartService: CartService, private store: Store<AppState>) {
    this.isOpened = true;
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick.subscribe(() => {
      this._closeDialogWithAnimation();
    })
  }

  cartItems$: Observable<CardNFT[]> = this.store.select(selectCart)
  totalCart$: Observable<number> = this.store.select(selectTotalValueCart);


  protected readonly Icons = Icons;
  isOpened = true;

  closeCart(): void {
    this._closeDialogWithAnimation();
  }

  onRemoveItemCart(item: CardNFT): void {
    this.store.dispatch(CartActions.remove({ item }))
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clear());
  }

  private _closeDialogWithAnimation() {
    this.isOpened = false;
    setTimeout(() => {
      this.dialogRef.close()
    }, slideInOutAnimationTime)
  }
}
