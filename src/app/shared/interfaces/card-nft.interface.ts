export interface CardNFT {
  id: string;
  title: string;
  creator: string;
  nameSeo: string;
  idListing: string;
  img: {
    src: string,
    alt: string
  },
  price: number
  currency: string,
}
