import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardToBuyComponent } from './card-to-buy.component';
import { HarnessLoader } from "@angular/cdk/testing";
import { DebugElement } from "@angular/core";
import { CardToBuy } from "../../interfaces";
import { cardToBuyMock } from "../../../mocks";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatCardHarness, MatCardSection } from "@angular/material/card/testing";
import { By } from "@angular/platform-browser";
import { MatButtonHarness } from "@angular/material/button/testing";
import { MatIconHarness } from "@angular/material/icon/testing";

fdescribe('CardToBuyComponent', () => {
  let component: CardToBuyComponent;
  let fixture: ComponentFixture<CardToBuyComponent>;
  let loader: HarnessLoader;
  let elementDebug: DebugElement;
  const mockCardToBuyData: CardToBuy = cardToBuyMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardToBuyComponent]
    });
    fixture = TestBed.createComponent(CardToBuyComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.cardToBuy = mockCardToBuyData;
    elementDebug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should input be truthy()', () => {
    expect(component.cardToBuy).toBeTruthy();
  });

  it('should create a mat-card', async () => {
    const matCard: MatCardHarness = await loader.getHarness(MatCardHarness);
    expect(matCard).toBeTruthy();
  })

  it('shout not display mat-card if cardToBuy is undefined', async () => {
    component.cardToBuy = undefined;
    fixture.detectChanges();
    const matCardDe = elementDebug.query(By.css('.card-buy'));
    expect(matCardDe).toBeFalsy();
  })

  it('should render card image', () => {
    const imgDe = elementDebug.query(By.css('.mat-mdc-card-image'));
    const imgEl: HTMLImageElement = imgDe.nativeElement;
    expect(imgEl.src).toBe(mockCardToBuyData.img.src);
    expect(imgEl.alt).toBe(mockCardToBuyData.img.alt);
  })

  it('should render card content correctly', async () => {
    const matCard: MatCardHarness = await loader.getHarness(MatCardHarness);
    const matCardContent = await matCard.getChildLoader(MatCardSection.CONTENT);
    expect(matCardContent).toBeTruthy();

    const contentDe: DebugElement = elementDebug.query(By.css('.mat-mdc-card-content'));
    const contentEl: HTMLElement = contentDe.nativeElement;
    const spans = contentEl.querySelectorAll('span');
    expect(spans.length).toBe(3);

    const titleSpan = spans[0];
    const titleText = `${mockCardToBuyData.title} #${mockCardToBuyData.idListing}`;
    expect(titleSpan.textContent).toContain(titleText);

    const priceSpan = spans[1];
    const priceText = `${mockCardToBuyData.price} ${mockCardToBuyData.currency}`;
    expect(priceSpan.textContent).toContain(priceText);

    const lastSaleSpan = spans[2];
    const lastSaleText = `Last sale: ${mockCardToBuyData.lastSale?.price} ${mockCardToBuyData.lastSale?.currency}`;
    expect(lastSaleSpan.textContent).toContain(lastSaleText);
  })

  it('should not render lastSale content if lastSale is undefined', () => {
    // LastSale === undefined;
    component.cardToBuy = {
      ...mockCardToBuyData,
      lastSale: undefined
    }
    fixture.detectChanges();
    const contentDe: DebugElement = elementDebug.query(By.css('.mat-mdc-card-content'));
    const contentEl: HTMLElement = contentDe.nativeElement;
    const spans = contentEl.querySelectorAll('span');
    expect(spans.length).toBe(2);

    const lastSaleSpan = spans[2];
    expect(lastSaleSpan).toBeFalsy();
  })

  it('should render card-actions buttons', async () => {
    const matCard: MatCardHarness = await loader.getHarness(MatCardHarness);
    const matCardAction = await matCard.getChildLoader(MatCardSection.ACTIONS);
    expect(matCardAction).toBeTruthy();

    const buttons = await matCardAction.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(2);

    const buyNowButton = buttons[0];
    expect(await buyNowButton.getText()).toBe('Buy now');

    const shoppingButton = buttons[1];
    const shoppingIcon = await shoppingButton.getHarness(MatIconHarness);
    expect(await shoppingIcon.getName()).toBe('shopping_cart');

    const shoppingIconEl = await shoppingIcon.host();
    expect(await shoppingIconEl.hasClass('material-icons-outlined')).toBeTrue();
  })
});
