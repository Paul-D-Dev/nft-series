import { CardNFT } from "./card-nft.interface";

export interface CardToBuy extends CardNFT {
  lastSale?: {
    price: number,
    currency: string
  }
}
