import { CommonModule }             from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule }          from '@angular/material/button';
import { MatCardModule }            from '@angular/material/card';
import { MatIconModule }            from '@angular/material/icon';
import { CardToBuy }                from '../../interfaces';
import { CartService }              from '../../services/cart.service';

@Component({
  selector: 'app-card-to-buy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-to-buy.component.html',
  styleUrls: ['./card-to-buy.component.scss']
})

export class CardToBuyComponent {
  cartService: CartService = inject(CartService)
  @Input({ required: true }) cardToBuy: CardToBuy | undefined


  addToCart(id: string): void {
    this.cartService.add(id)
  }
}
