import { trigger, transition, style, animate, state } from '@angular/animations';
import { DialogRef }                                  from '@angular/cdk/dialog';
import { CommonModule }                               from '@angular/common';
import { Component, Input }                           from '@angular/core';
import { MatButtonModule }                            from '@angular/material/button';
import { MatIconModule }                              from '@angular/material/icon';
import { MatListModule }                              from '@angular/material/list';
import { Icons }                                      from '../../enums';

const slideInOutAnimationTime = 150;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      state('desktopIn', style({ transform: 'translateX(0)', opacity: 1 })),
      state('desktopOut', style({ transform: 'translateX(100%)', opacity: 0 })),
      // transition('void => desktopIn', animate(slideInOutAnimationTime)),
      transition('desktopIn <=> desktopOut', animate(slideInOutAnimationTime)),
    ])
  ]
})

export class CartComponent {
  constructor(public dialogRef: DialogRef) {
    this.animationState('desktop', 'Out');
    this.isOpened = true;
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick.subscribe(() => {
      this._closeDialog();
    })
  }

  protected readonly Icons = Icons;
  animateState!: string;
  isOpened = true;
  isDisabled: boolean = false;

  @Input() items: unknown[] = [];

  ngOnInit() {
    // this.animationState('desktop', 'In');
  }

  closeCart(): void {
    this.animationState('desktop', 'Out')
    this._closeDialog();
  }

  clearCart(): void {
    console.log('clear cart');
  }

  // When isOpened will turn to false, it will trigger the animation event
  // With event.toState === void, it closes the modal
  onAnimationEvent(event: any) {
    console.log(event)
    if (event.toState === 'desktopOut') {
      this.dialogRef.close();
    }
  }

  animationState(device: string, way: 'In' | 'Out'): string {
    return this.animateState = `${device}${way}`
  }

  private _closeDialog() {
    // this.isOpened = false;
    this.animationState('desktop', 'Out')
  }
}
