import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Icons } from '../../enums';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  protected readonly Icons = Icons;
  _router: Router = inject(Router);
  @Input() isActiveSideNav: boolean = false
  @Output() toggleSideNav = new EventEmitter();

  navigateToHomePage(): void {
    this._router.navigateByUrl('/');
  }

  emitToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

}
