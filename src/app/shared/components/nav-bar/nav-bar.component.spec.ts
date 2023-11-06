import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { Router } from "@angular/router";

fdescribe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigateByUrl'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [{
        provide: Router, useValue: routerSpy
      }],
    });
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the home page', () => {
    // source: https://danielk.tech/home/how-to-test-the-angular-router
    component.navigateToHomePage();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  })

  it('should emit toggleSideNav event', () => {
    spyOn(component.toggleSideNav, 'emit');
    component.emitToggleSideNav();
    expect(component.toggleSideNav.emit).toHaveBeenCalled();
  })

});
