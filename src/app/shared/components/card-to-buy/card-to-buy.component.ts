import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CardToBuy } from "../../interfaces";

@Component({
  selector: 'app-card-to-buy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-to-buy.component.html',
  styleUrls: ['./card-to-buy.component.scss']
})
export class CardToBuyComponent {
//     TODO: inputs
  @Input() cardToBuy: CardToBuy = {
    idListing: 332,
    title: 'Chaos Road',
    price: 0.99,
    currency: 'ETH',
    img: {
      src: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      alt: ''
    },
    lastSale: {
      price: 0.17,
      currency: 'WETH'
    }
  }

}
