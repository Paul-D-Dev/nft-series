import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardToBuyComponent } from './card-to-buy.component';
import { HarnessLoader } from "@angular/cdk/testing";
import { DebugElement } from "@angular/core";
import { CardToBuy } from "../../interfaces";
import { cardToBuyMock } from "../../../mocks";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatCardHarness } from "@angular/material/card/testing";
import { By } from "@angular/platform-browser";

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
});
