import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Icons } from '../../enums';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent {
  constructor() {

    // TODO service theme
    const darkPrefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkTheme = darkPrefersColorScheme;
  }

  protected readonly Icons = Icons;
  isDarkTheme = false;


}
