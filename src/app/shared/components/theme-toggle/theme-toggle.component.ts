import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { Icons } from '../../enums';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  providers: [ThemeService]
})
export class ThemeToggleComponent {
  constructor(protected themeService: ThemeService) {
    this.themeService.initUserTheme();
  }

  @Input() displayIcon = true;
  protected readonly Icons = Icons;
  isDarkTheme$: Observable<boolean> = this.themeService.userThemeIsDark$;


}
