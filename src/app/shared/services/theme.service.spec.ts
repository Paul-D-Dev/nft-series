import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../enums';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  const mockRenderer = jasmine.createSpyObj(['addClass', 'removeClass'])


  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj(
      ['_darkPrefersColorScheme', '_userTheme$', 'initUserTheme', 'toggleUserTheme'], {
        '_darkPrefersColorScheme': false,
        '_userTheme$': new BehaviorSubject<Theme | null>(null)
      })
    TestBed.configureTestingModule({
      providers: [
        {provide: ThemeService, useValue: serviceSpy},
        {provide: Renderer2, useValue: mockRenderer}
      ]
    });
    service = TestBed.inject(ThemeService);
    themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init prefersColorScheme dark to false', () => {
    expect(themeServiceSpy['_darkPrefersColorScheme']).toBeFalse();
  })

  // it('should call initUserTheme', () => {
  //   expect(themeServiceSpy).toBeDefined()
  //   console.log(service['_userTheme']);
  //   expect(service.toggleUserTheme).toHaveBeenCalled()
  // })

});
