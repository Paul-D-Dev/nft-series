import { CardToBuy } from '../shared/interfaces';

export const cardToBuyMock: CardToBuy = {
  id: '1231',
  nameSeo: 'name',
  idListing: 332,
  title: 'Chaos Road',
  price: 0.99,
  currency: 'ETH',
  img: {
    src: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    alt: ''
  },
  lastSale: {
    price: 0.17,
    currency: 'WETH'
  }
}
