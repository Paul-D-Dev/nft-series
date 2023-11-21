import { TestBed }     from '@angular/core/testing';
import { CartService } from './cart.service';
import { CardNFT }     from "../interfaces";

fdescribe('CartService', () => {
  let service: CartService;
  const items: CardNFT[] = [
    {
      id: '1',
      price: 2,
      creator: 'zou',
      currency: 'ETH',
      title: 'Mystery',
      nameSeo: 'zou-mystery',
      img: {
        src: 'sourceImage',
        alt: 'altImage'
      },
      idListing: '3'
    },
    {
      id: '2',
      price: 3,
      creator: 'zoulou',
      currency: 'POL',
      title: 'Making',
      nameSeo: 'zoulou-making',
      img: {
        src: 'sourceImage',
        alt: 'altImage'
      },
      idListing: '1'
    },
  ]
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to the cart', () => {
    service.add(items[0]);
    service.getCart$().subscribe(cart => {
      expect(cart?.items.length).toBe(1);
      expect(cart?.items[0]).toBe(items[0]);
    });
  });

  it('should not add duplicate item to the cart', () => {
    service.add(items[0]);
    service.add(items[0]);
    service.getCart$().subscribe(cart => {
      expect(cart?.items.length).toBe(1);
    });
  });

  it('should remove item from the cart', () => {
    service.add(items[0]);
    service.remove(items[0]);
    service.getCart$().subscribe(cart => {
      expect(cart?.items.length).toBe(0);
    });
  });

  it('should clear all items from the cart', () => {
    service.add(items[0]);
    service.add(items[1]);
    service.clearAll();

    service.getCart$().subscribe(cart => {
      expect(cart?.items.length).toBe(0);
    });
  });
});
