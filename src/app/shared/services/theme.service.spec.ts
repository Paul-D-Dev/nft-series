import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  const mockRenderer = jasmine.createSpyObj(['addClass', 'removeClass'])


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        {provide: Renderer2, useValue: mockRenderer}
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
