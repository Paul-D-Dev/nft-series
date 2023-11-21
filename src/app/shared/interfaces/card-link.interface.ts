import { CardNFT } from './card-nft.interface';

export interface CardLink extends CardNFT {
  nameSeo: string;
  floor: number;
}
