import { CardNFT } from "./card-nft.interface";

export interface CardToBuy extends CardNFT {
  idListing: number,
  price: number,
  lastSale?: {
    price: number,
    currency: string
  }
}
