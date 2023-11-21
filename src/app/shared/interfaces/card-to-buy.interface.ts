import { CardNFT } from "./card-nft.interface";

export interface CardToBuy extends CardNFT {
  idListing: number,
  lastSale?: {
    price: number,
    currency: string
  }
}
