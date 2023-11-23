import { ComponentFixture, TestBed }   from '@angular/core/testing';
import { NavBarComponent }             from './nav-bar.component';
import { Router }                      from "@angular/router";
import { HarnessLoader, TestElement }  from "@angular/cdk/testing";
import { TestbedHarnessEnvironment }   from "@angular/cdk/testing/testbed";
import { DebugElement }                from "@angular/core";
import { MatToolbarHarness }           from "@angular/material/toolbar/testing";
import { MatButtonHarness }            from "@angular/material/button/testing";
import { MatIconHarness }              from "@angular/material/icon/testing";
import { Icons }                       from "../../enums";
import { By }                          from "@angular/platform-browser";
import { AppState }                    from "../../store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

fdescribe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let loader: HarnessLoader;
  let elementDebug: DebugElement;
  let store: MockStore
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const initialState: AppState = {
    cart: {
      items: []
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        { provide: Router, useValue: routerSpy, },
        provideMockStore({ initialState }),
      ]
    })
    fixture = TestBed.createComponent(NavBarComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    elementDebug = fixture.debugElement;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the home page', () => {
    // source: https://danielk.tech/home/how-to-test-the-angular-router
    component.navigateToHomePage();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should emit toggleSideNav event', () => {
    spyOn(component.toggleSideNav, 'emit');
    component.emitToggleSideNav();
    expect(component.toggleSideNav.emit).toHaveBeenCalled();
  });

  describe('ui', () => {
    let matToolBar: MatToolbarHarness;

    beforeEach(async () => {
      matToolBar = await loader.getHarness(MatToolbarHarness);
    });

    describe('mat-toolbar', () => {
      it('should display mat-toolbar', async () => {
        expect(await matToolBar).toBeTruthy();
      });

      it('mat-toolbar should have classes', async () => {
        const elHost: TestElement = await matToolBar.host();
        expect(await elHost.hasClass('nav'))
          .withContext('class nav')
          .toBeTrue();
        expect(await elHost.hasClass('toolbar__grid'))
          .withContext('class toolbar__grid')
          .toBeTrue();
      });
    });

    describe('menu button', () => {
      let menuButton: MatButtonHarness;

      beforeEach(async () => {
        menuButton = await matToolBar.getHarness(MatButtonHarness);
      });

      it('should have menu button', async () => {
        component.isActiveSideNav = false;
        fixture.detectChanges();
        const iconButton = await menuButton.getHarness(MatIconHarness);
        expect(await iconButton.getName()).toBe(Icons.Menu);

        component.isActiveSideNav = true;
        fixture.detectChanges();
        expect(await iconButton.getName()).toBe(Icons.Close);
      });

      it('should call emitToggleSideNav when clicked on menu button', async () => {
        spyOn(component, 'emitToggleSideNav');
        await menuButton.click();
        expect(component.emitToggleSideNav).toHaveBeenCalled();
      });
    });

    describe('brand name', () => {
      let spanBrandNameEl: DebugElement;
      beforeEach(() => {
        spanBrandNameEl = elementDebug.query(By.css('.brand__name'));
      });

      it('should display the brand name', () => {
        const spanBrandName: HTMLElement = spanBrandNameEl.nativeElement;
        expect(spanBrandName.textContent).toContain('NFT Series');
      });

      it('click should trigger navigateToHomePage', () => {
        spyOn(component, 'navigateToHomePage');
        spanBrandNameEl.triggerEventHandler('click');
        expect(component.navigateToHomePage).toHaveBeenCalledTimes(1);
      });
    });

    describe('toolbar__icons', () => {
      let toolBarIconsLoader: HarnessLoader;

      beforeEach(async () => {
        toolBarIconsLoader = await loader.getChildLoader('.toolbar__icons');
      });

      it('should create', () => {
        expect(toolBarIconsLoader).toBeTruthy();
      });

      describe('connect wallet mat-button', () => {
        let connectWalletButton: MatButtonHarness;

        beforeEach(async () => {
          // source1: https://github.com/angular/components/blob/main/guides/using-component-harnesses.md
          // source2: https://blog.angulartraining.com/how-to-use-angular-material-harnesses-to-improve-your-component-tests-7fe6359f67ce
          connectWalletButton = await toolBarIconsLoader.getHarness(MatButtonHarness);
        });

        it('should create', async () => {
          expect(await connectWalletButton.getText()).toContain('Connect wallet');
        });

        it('should be flat', async () => {
          expect(await connectWalletButton.getVariant()).toBe('flat');
        });

        it('should have color accent', async () => {
          const buttonElement: TestElement = await connectWalletButton.host();
          expect(await buttonElement.getAttribute('color'))
            .withContext('color is accent')
            .toBe('accent');
        });

        it('should have icon wallet', async () => {
          const walletIcon = await connectWalletButton.getHarness(MatIconHarness);
          expect(await walletIcon.getName()).toBe(Icons.Wallet);
        });
      });

    });
  });


});
