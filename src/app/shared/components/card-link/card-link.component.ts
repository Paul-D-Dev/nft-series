import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardLink } from '../../interfaces';

@Component({
  selector: 'app-card-link',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.scss']
})
export class CardLinkComponent {
  @Input() cardLinkData!: CardLink
}
