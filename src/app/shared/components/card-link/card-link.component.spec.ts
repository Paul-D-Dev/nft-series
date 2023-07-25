import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { By } from '@angular/platform-browser';
import { CardLink } from '../../interfaces';
import { CardLinkComponent } from './card-link.component';


describe('CardLinkComponent', () => {
  let component: CardLinkComponent;
  let fixture: ComponentFixture<CardLinkComponent>;
  let loader: HarnessLoader;
  let elementDebug: DebugElement;
  const mockCardData: CardLink = {
    title: 'Card Title',
    devise: 'ETH',
    floor: 0.01,
    imgUrl: 'path/to/image.png'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardLinkComponent]
    });
    fixture = TestBed.createComponent(CardLinkComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.cardLinkData = mockCardData;
    elementDebug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement.href).toContain('#');

  })
});
