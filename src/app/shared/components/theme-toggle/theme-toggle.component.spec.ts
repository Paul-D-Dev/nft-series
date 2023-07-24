import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Icons } from '../../enums';
import { ThemeService } from '../../services/theme.service';
import { ThemeToggleComponent } from './theme-toggle.component';


describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let loader: HarnessLoader;
  let themeService: ThemeService;

  beforeEach(() => {
    const themeServiceSpy = jasmine.createSpyObj<ThemeService>(
      'ThemeService',
      ['userThemeIsDark$', 'toggleUserTheme'],
    );
    TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [{provide: ThemeService, useValue: themeServiceSpy}]
    });
    fixture = TestBed.createComponent(ThemeToggleComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    themeService = TestBed.inject<ThemeService>(ThemeService) as jasmine.SpyObj<ThemeService>;
    component = fixture.componentInstance;
    fixture.detectChanges();

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

  it('should display the icon', () => {
    component.displayIcon = true;

    let iconDe = fixture.debugElement.query(By.css('.mat-icon'));
    const iconDisplayEl = iconDe.nativeElement;
    expect(iconDisplayEl).toBeTruthy();

    component.displayIcon = false;
    fixture.detectChanges();
    iconDe = fixture.debugElement.query(By.css('.mat-icon'));
    expect(iconDe).withContext('displayIcon = false').toBeFalsy();
  })

  it('should display the right icon', async () => {
    component.displayIcon = true;
    fixture.detectChanges();
    const icon = await loader.getHarness(MatIconHarness);
    expect(await icon.getName()).toBe(Icons.DarkMode);

    component.isDarkTheme$ = of(false);
    fixture.detectChanges();
    expect(await icon.getName()).toBe(Icons.LightMode);
  })

  it('should call toggleTheme on mat-slide-toggle change', async () => {
    spyOn(component, 'toggleTheme');
    const slideToggle = await loader.getHarness(MatSlideToggleHarness);
    await slideToggle.toggle();
    expect(component.toggleTheme).toHaveBeenCalledTimes(1);
    expect(component.toggleTheme).toHaveBeenCalledWith(false);
  })

});
