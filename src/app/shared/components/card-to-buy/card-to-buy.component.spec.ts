import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardToBuyComponent } from './card-to-buy.component';

describe('CardToBuyComponent', () => {
  let component: CardToBuyComponent;
  let fixture: ComponentFixture<CardToBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardToBuyComponent]
    });
    fixture = TestBed.createComponent(CardToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
