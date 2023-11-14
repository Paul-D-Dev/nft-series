import { HarnessLoader, TestElement } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment }  from '@angular/cdk/testing/testbed';
import { DebugElement }               from '@angular/core';
import { ComponentFixture, TestBed }  from '@angular/core/testing';
import { MatCardHarness }             from '@angular/material/card/testing';
import { By }                         from '@angular/platform-browser';
import { RouterTestingModule }        from '@angular/router/testing';
import { cardLinkMock }               from '../../../mocks';
import { CardLink }                   from '../../interfaces';
import { CardLinkComponent }          from './card-link.component';


describe('CardLinkComponent', () => {
  let component: CardLinkComponent;
  let fixture: ComponentFixture<CardLinkComponent>;
  let loader: HarnessLoader;
  let elementDebug: DebugElement;
  const mockCardData: CardLink = cardLinkMock[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardLinkComponent, RouterTestingModule]
    });
    fixture = TestBed.createComponent(CardLinkComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    elementDebug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('input cardLinkData = undefined', () => {
    it('should cardLinkData undefined', () => {
      expect(component.cardLinkData).toBeUndefined();
    });

    it('should not display mat-card', () => {
      const matCard = elementDebug.query(By.css('.mat-mdc-card'));
      expect(matCard).toBeFalsy();
    })
  })

  describe('input: cardLinkData', () => {
    beforeEach(() => {
      component.cardLinkData = mockCardData;
      fixture.detectChanges();
    })

    it('should cardLinkData defined', () => {
      expect(component.cardLinkData).toBeDefined();
    })

    it('should create a mat-card', async () => {
      const matCard: MatCardHarness = await loader.getHarness(MatCardHarness);
      expect(matCard).toBeTruthy();
    })

    it('should render card content correctly', () => {
      const titleDe = elementDebug.query(By.css('.card__content__title'));
      const titleEl: HTMLElement = titleDe.nativeElement
      expect(titleEl.textContent).toBe(mockCardData.title);

      const floorDe = elementDebug.query(By.css('.card__content__details__floor'));
      const floorEl: HTMLElement = floorDe.nativeElement;
      expect(floorEl.textContent).toContain('Floor');
      expect(floorEl.textContent).toContain(`${mockCardData.floor} ${mockCardData.devise}`);

      const imgDe = elementDebug.query(By.css('.mat-mdc-card-image'));
      const imgEl: HTMLImageElement = imgDe.nativeElement;
      expect(imgEl.src).toContain(mockCardData.imgUrl);
    })

    it('should have a routerLink with the correct URL', async () => {
      const matCard: MatCardHarness = await loader.getHarness(MatCardHarness);
      const matCardEl: TestElement = await matCard.host()
      const routerLinkAttribute: string | null = await matCardEl.getAttribute('ng-reflect-router-link');
      expect(routerLinkAttribute).withContext('mat-card should have routerLink').toBe(`collections,${mockCardData.nameSeo}`)
    })
  })


});
