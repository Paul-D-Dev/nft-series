import { DialogRef }        from '@angular/cdk/dialog';
import { CommonModule }     from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { MatListModule }    from '@angular/material/list';
import { Icons }            from '../../enums';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(public dialogRef: DialogRef) {}

  @Input() items: unknown[] = [];
  isDisabled: boolean = false;

  closeCart(): void {
    console.log('close cart');
    this.dialogRef.close();
  }

  clearCart(): void {
    console.log('clear cart');
  }
  protected readonly Icons = Icons;
}
