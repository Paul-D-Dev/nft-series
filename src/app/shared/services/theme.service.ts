import { DOCUMENT } from '@angular/common';
import { Injectable, inject, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Theme } from '../enums';

@Injectable()
export class ThemeService {
  private _document: Document = inject(DOCUMENT);
  private _renderer: Renderer2 = inject(Renderer2);
  private readonly _darkPrefersColorScheme: boolean = window.matchMedia(`(prefers-color-scheme: ${Theme.Dark})`).matches;
  private _userTheme$: BehaviorSubject<Theme | null> = new BehaviorSubject<Theme | null>(null);
  private get _userTheme(): Theme | null {
    return this._userTheme$.getValue();
  }
  get userThemeIsDark$(): Observable<boolean> {
    return this._userTheme$.asObservable().pipe(
      map((theme: Theme | null): boolean => theme === Theme.Dark)
    );
  }

  initUserTheme(): void {
    if (!this._userTheme) {
      this.toggleUserTheme(this._darkPrefersColorScheme);
    } else {
      this.toggleUserTheme(this._userTheme === Theme.Dark);
    }
  }

  toggleUserTheme(bool: boolean): void {
    this._userTheme$.next(bool ? Theme.Dark : Theme.Light);
    if (bool) {
      this._setDarkTheme()
    } else {
      this._removeDarkTheme();
    }
  }

  private _setDarkTheme(): void {
    this._renderer.addClass(this._document.body, `${Theme.Dark}-theme`);
  }

  private _removeDarkTheme(): void {
    this._renderer.removeClass(this._document.body, `${Theme.Dark}-theme`);
  }
}
