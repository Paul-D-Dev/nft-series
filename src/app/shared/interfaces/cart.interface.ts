import { CardNFT } from "./card-nft.interface";

export interface Cart {
  items: CartItem[];
}

export interface CartItem extends CardNFT {
  quantity: number
}
