import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  add(id: string): void {
    console.log('add ', id)
  }

  remove(): void {

  }

  checkOut(): void {

  }
}
