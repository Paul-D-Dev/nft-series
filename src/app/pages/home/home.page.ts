import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardLinkComponent, SwiperComponent } from '../../shared/components';
import { CardLink } from '../../shared/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardLinkComponent, SwiperComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  cards: CardLink[] = [
    {title: 'Stranger Things', floor: 0.09, devise: 'ETH', imgUrl: 'https://picsum.photos/600'},
    {title: 'Stranger Things 2', floor: 1.35, devise: 'BSC', imgUrl: 'https://picsum.photos/600'},
    {title: 'Stranger Things 3', floor: 10.59, devise: 'POL', imgUrl: 'https://picsum.photos/600'},
    {title: 'Stranger Things', floor: 0.09, devise: 'ETH', imgUrl: 'https://picsum.photos/600'},
    {title: 'Stranger Things 2', floor: 1.35, devise: 'BSC', imgUrl: 'https://picsum.photos/600'},
    {title: 'Stranger Things 3', floor: 10.59, devise: 'POL', imgUrl: 'https://picsum.photos/600'},
  ]
}
