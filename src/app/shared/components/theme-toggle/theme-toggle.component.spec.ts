import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { of, Observable } from 'rxjs';
import { Icons } from '../../enums';
import { ThemeService } from '../../services/theme.service';
import { ThemeToggleComponent } from './theme-toggle.component';


describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let loader: HarnessLoader;

  let themeServiceSpy = jasmine.createSpyObj('ThemeService', ['userThemeIsDark$']);
  let themeService: ThemeService;
  let isDark: boolean;
  let userThemeIsDarkSpy$: Observable<boolean>;
  let el: DebugElement;

  beforeEach(() => {
    // isDark = true;
    userThemeIsDarkSpy$ = themeServiceSpy.userThemeIsDark$.and.returnValue(of(isDark));
    waitForAsync(() => {

    })
    TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [{provide: ThemeService, useValue: themeServiceSpy}]
    });
    fixture = TestBed.createComponent(ThemeToggleComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;

    themeService = TestBed.inject(ThemeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isDarkTheme$ correctly', () => {
    expect(component.isDarkTheme$).toBeDefined();
  });

  it('should display mat-slide-toggle', async () => {
    const slideToggle = await loader.getHarness(MatSlideToggleHarness);
    expect(slideToggle).toBeTruthy();
  })

  it('should init checked with isDarkTheme$', async () => {
    const slideToggle = await loader.getHarness(MatSlideToggleHarness);
    component.isDarkTheme$ = of(true);
    fixture.detectChanges();
    expect(await slideToggle.isChecked()).toBe(true);

    component.isDarkTheme$ = of(false);
    fixture.detectChanges();
    expect(await slideToggle.isChecked()).toBe(false);
  })

  it('should display the right icon', async () => {
    const icon = await loader.getHarness(MatIconHarness);
    expect(await icon.getName()).toBe(Icons.DarkMode);

    component.isDarkTheme$ = of(false);
    fixture.detectChanges();
    expect(await icon.getName()).toBe(Icons.LightMode);

  })

});
