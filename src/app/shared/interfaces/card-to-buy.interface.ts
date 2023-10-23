export interface CardToBuy {
  idListing: number,
  title: string,
  price: number,
  currency: string,
  img: {
    src: string,
    alt: string
  },
  lastSale?: {
    price: number,
    currency: string
  }
}
