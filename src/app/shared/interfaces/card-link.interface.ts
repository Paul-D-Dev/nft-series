import { Card } from './card.interface';

export interface CardLink extends Card {
  id: number;
  nameSeo: string;
  floor: number;
  devise: string;
}
