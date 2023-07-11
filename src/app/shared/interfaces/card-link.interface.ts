import { Card } from './card.interface';

export interface CardLink extends Card {
  floor: number;
  devise: string;
}
