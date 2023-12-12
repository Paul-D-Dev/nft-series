import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { cardLinkMock } from '../../mocks';
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
  cards: CardLink[] = cardLinkMock;
}
