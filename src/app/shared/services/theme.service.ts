import { inject, Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Theme } from '../enums';
import { DOCUMENT } from "@angular/common";

@Injectable()
export class ThemeService {

  private _document: Document = inject(DOCUMENT);
  private _renderer: Renderer2 = inject(Renderer2);
  readonly darkPrefersColorScheme: boolean = window.matchMedia(`(prefers-color-scheme: ${Theme.Dark})`).matches;
  userTheme$: BehaviorSubject<Theme | null> = new BehaviorSubject<Theme | null>(null);

  get userTheme(): Theme | null {
    return this.userTheme$.getValue();
  }

  get userThemeIsDark$(): Observable<boolean> {
    return this.userTheme$.asObservable().pipe(
      map((theme: Theme | null): boolean => theme === Theme.Dark)
    );
  }

  initUserTheme(): void {
    if (!this.userTheme) {
      this.toggleUserTheme(this.darkPrefersColorScheme);
    } else {
      this.toggleUserTheme(this.userTheme === Theme.Dark);
    }
  }

  toggleUserTheme(bool: boolean): void {
    this.userTheme$.next(bool ? Theme.Dark : Theme.Light);
    if (bool) {
      this.setDarkTheme()
    } else {
      this.removeDarkTheme();
    }
  }

  setDarkTheme(): void {
    this._renderer.addClass(this._document.body, `${Theme.Dark}-theme`);
  }

  removeDarkTheme(): void {
    this._renderer.removeClass(this._document.body, `${Theme.Dark}-theme`);
  }
}
