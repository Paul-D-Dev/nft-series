import { CommonModule }                           from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule }                        from '@angular/material/button';
import { MatCardModule }                          from '@angular/material/card';
import { MatIconModule }                          from '@angular/material/icon';
import { CardNFT, CardToBuy }                     from '../../interfaces';

@Component({
  selector: 'app-card-to-buy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-to-buy.component.html',
  styleUrls: ['./card-to-buy.component.scss']
})

export class CardToBuyComponent {
  @Input({ required: true }) cardToBuy: CardToBuy | undefined;
  @Output() addToCart = new EventEmitter<CardNFT>();
}
