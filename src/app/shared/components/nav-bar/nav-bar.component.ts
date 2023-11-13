import { Dialog, DialogModule }                           from '@angular/cdk/dialog';
import { CommonModule }                                   from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule }                                from '@angular/material/button';
import { MatIconModule }                                  from '@angular/material/icon';
import { MatToolbarModule }                               from '@angular/material/toolbar';
import { Router }                                         from '@angular/router';
import { Observable }                                     from 'rxjs';
import { Icons }                                          from '../../enums';
import { AuthService }                                    from '../../services/auth.service';
import { CartComponent }                                  from '../cart/cart.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, DialogModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  _router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  dialog: Dialog = inject(Dialog);
  protected readonly Icons = Icons;
  readonly metaAddress$: Observable<string> = this.authService.metaAddress$;
  @Input() isActiveSideNav: boolean = false
  @Output() toggleSideNav = new EventEmitter();

  ngOnInit() {
    this.openCart();
  }

  navigateToHomePage(): void {
    this._router.navigateByUrl('/');
  }

  emitToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  connectToMetaMask() {
    this.authService.signInWithMetaMask().subscribe({
      next(data) {
        console.log(data)
      },
      error(err) {
        console.error(err);
      }
    });
  }

  openCart(): void {
    console.log('open cart');
    this.dialog.open(CartComponent, {
      // backdropClass: 'op'
    });
  }

}
