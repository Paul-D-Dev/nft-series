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
import { selectCartTotalItem }         from "../../store/cart";
import { MatBadgeHarness }             from "@angular/material/badge/testing";
import { CartComponent }               from "../cart/cart.component";

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let loader: HarnessLoader;
  let elementDebug: DebugElement;
  let store: MockStore
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl']);
  // const dialogSpy = jasmine.createSpyObj('Dialog', ['open']);
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
        // { provide: Dialog, useValue: dialogSpy }
      ]
    })
    fixture = TestBed.createComponent(NavBarComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    elementDebug = fixture.debugElement;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.inject(MockStore).resetSelectors();
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

  it('should init totalCartItems to 0', (done: any) => {
    store.select(selectCartTotalItem).subscribe((mockCartTotalItem) => {
      expect(mockCartTotalItem).toEqual(0);
    });
    done();
  })

  it('should openCart open dialog CartComponent', () => {
    spyOn(component.dialog, 'open');
    component.openCart();
    fixture.detectChanges();
    expect(component.dialog.open).toHaveBeenCalledOnceWith(CartComponent);
  })

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

      it('should have 2 buttons', async () => {
        const buttons = await toolBarIconsLoader.getAllHarnesses(MatButtonHarness);
        expect(buttons.length).toEqual(2);
      })

      describe('connect wallet mat-button', () => {
        let connectWalletButton: MatButtonHarness;

        beforeEach(async () => {
          // source1: https://github.com/angular/components/blob/main/guides/using-component-harnesses.md
          // source2: https://blog.angulartraining.com/how-to-use-angular-material-harnesses-to-improve-your-component-tests-7fe6359f67ce
          connectWalletButton = await toolBarIconsLoader.getHarness(MatButtonHarness.with({
            selector: '.connect__wallet__button'
          }));
        });

        it('should create', async () => {
          expect(await connectWalletButton).toBeDefined();
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

      describe('button open cart', async () => {
        let openCartButton: MatButtonHarness;

        beforeEach(async () => {
          openCartButton = await toolBarIconsLoader.getHarness(MatButtonHarness.with({
            selector: '.cart__button'
          }))
        })

        it('should create', async () => {
          expect(await openCartButton).toBeDefined();
        });

        it('should have a shopping cart icon', async () => {
          const shoppingCartIcon: MatIconHarness = await openCartButton.getHarness(MatIconHarness);
          expect(await shoppingCartIcon).toBeDefined();
          expect(await shoppingCartIcon.getName()).toBe(Icons.ShoppingCart);
        })

        it('should onClick call openCart()', async () => {
          spyOn(component, "openCart");
          await openCartButton.click();
          expect(component.openCart).toHaveBeenCalled();
        });

        describe('mat-badge', () => {
          let badge: MatBadgeHarness;

          beforeEach(async () => {
            badge = await loader.getHarness(MatBadgeHarness);
          });

          it('should create', async () => {
            expect(await badge).toBeDefined();
          });

          it('should open cart button get mat-badge', async () => {
            const host = await openCartButton.host();
            expect(await host.hasClass('mat-badge')).toBeTrue();
          });

          it('should hide mat-badge', async () => {
            expect(await badge.isHidden()).toBeTrue();
          })

          it('should display and count 1', async () => {
            const total = 1;
            store.overrideSelector(selectCartTotalItem, total);
            store.refreshState();
            fixture.detectChanges();
            expect(await badge.isHidden()).toBeFalse();
            expect(await badge.getText()).toBe(total.toString());
          })
        })

      })

    });
  });


});
