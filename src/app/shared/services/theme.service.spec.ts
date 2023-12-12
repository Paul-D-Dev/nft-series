import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from "@angular/common";
import { Theme } from "../enums";

describe('ThemeService', () => {
  let service: ThemeService;
  let document: Document;
  let renderer: jasmine.SpyObj<Renderer2>;


  beforeEach(() => {
    const mockRenderer = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);
    const windowMock = jasmine.createSpyObj('window', ['matchMedia']);

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: Renderer2, useValue: mockRenderer },
      ]
    });
    document = TestBed.inject(DOCUMENT);
    renderer = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
    service = TestBed.inject(ThemeService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add dark-theme class', () => {
    service.setDarkTheme();
    expect(renderer.addClass.calls.count()).toBe(1);
    expect(renderer.addClass).toHaveBeenCalledWith(document.body, `${Theme.Dark}-theme`);
  });

  it('should remove dark-theme class', () => {
    service.removeDarkTheme();
    expect(renderer.removeClass.calls.count()).toBe(1);
    expect(renderer.removeClass).toHaveBeenCalledWith(document.body, `${Theme.Dark}-theme`);
  });

  // TODO: init service values
  // TODO: toggleUserTheme Dark -> add class
  // TODO: toggleUserTheme Light -> remove class
  // TODO: get userThemeIsDark$ return observable boolean

});
