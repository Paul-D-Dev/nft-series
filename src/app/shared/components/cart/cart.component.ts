import { animate, style, transition, trigger } from '@angular/animations';
import { DialogRef }                           from '@angular/cdk/dialog';
import { CommonModule }                        from '@angular/common';
import { Component, Input }                    from '@angular/core';
import { MatButtonModule }                     from '@angular/material/button';
import { MatIconModule }                       from '@angular/material/icon';
import { MatListModule }                       from '@angular/material/list';
import { Icons }                               from '../../enums';
import { CartService }                         from "../../services/cart.service";
import { Observable }                          from "rxjs";
import { Cart }                                from "../../interfaces/cart.interface";
import { CardNFT }                             from "../../interfaces";

const slideInOutAnimationTime = 150;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatListModule],
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
  constructor(public dialogRef: DialogRef, private cartService: CartService) {
    this.isOpened = true;
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick.subscribe(() => {
      this._closeDialogWithAnimation();
    })
  }

  cart$: Observable<Cart | undefined> = this.cartService.getCart$();


  protected readonly Icons = Icons;
  isOpened = true;
  isDisabled: boolean = false;

  @Input() items: unknown[] = [];

  closeCart(): void {
    this._closeDialogWithAnimation();
  }

  onRemoveItemCart(item: CardNFT): void {
    this.cartService.remove(item);
  }

  clearCart(): void {
    console.log('clear cart');
  }

  private _closeDialogWithAnimation() {
    this.isOpened = false;
    setTimeout(() => {
      this.dialogRef.close()
    }, slideInOutAnimationTime)
  }
}
