import { BreakpointObserver }       from '@angular/cdk/layout';
import { CommonModule }             from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { takeUntilDestroyed }       from '@angular/core/rxjs-interop';
import { MatButtonModule }          from '@angular/material/button';
import { MatCardModule }            from '@angular/material/card';
import { MatCheckboxModule }        from '@angular/material/checkbox';
import { MatChipsModule }           from '@angular/material/chips';
import { MatExpansionModule }       from '@angular/material/expansion';
import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatIconModule }            from '@angular/material/icon';
import { MatInputModule }           from '@angular/material/input';
import { MatSelectModule }          from '@angular/material/select';
import { MatSidenavModule }         from '@angular/material/sidenav';
import { MatTabsModule }            from '@angular/material/tabs';
import { cardToBuyMock }            from '../../mocks';
import { CardToBuyComponent }       from '../../shared/components/card-to-buy/card-to-buy.component';
import { Icons }                    from '../../shared/enums';
import { CardNFT, CardToBuy }       from "../../shared/interfaces";
import { CartService }              from "../../shared/services/cart.service";
import { AppState }                 from "../../shared/store";
import { Store }                    from "@ngrx/store";
import { CartActions }              from "../../shared/store/cart";

interface CollectionDetail {
  imgBanner: string;
  imgAvatar: string;
  name: string;
  category: string;
  description: string;
  media: {
    shareUrl: string;
  },
  casting: Casting[]
}

interface Casting {
  actor: string,
  character: string
}

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [CommonModule, CardToBuyComponent, MatTabsModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatExpansionModule, MatChipsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCheckboxModule],
  templateUrl: './collection-detail.page.html',
  styleUrls: ['./collection-detail.page.scss']
})
export class CollectionDetailPage {
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe('(min-width: 967px)').pipe(
      takeUntilDestroyed()
      // TODO fix when we change the tab and resize width mobile to desktop
      // the first element of the list is hidden behind the filter
    ).subscribe(bp => this.isOpenedFilters = bp.matches)
  }

  cartService = inject(CartService);
  store = inject(Store<AppState>);

  @Input()
  set collectionName(name: string) {
    // this.collectionDetail!.name = name;
  }

  protected readonly Icons = Icons;
  protected readonly cardToBuyList: CardToBuy[] = [cardToBuyMock, { ...cardToBuyMock, id: '4', idListing: '1111' }]
  isOpenedFilters: boolean = false;
  collectionDetail: CollectionDetail | null = {
    imgAvatar: 'https://kultt.fr/wp-content/uploads/2022/02/poster-freaks_02.jpg',
    imgBanner: 'https://kultt.fr/wp-content/uploads/2022/02/poster-freaks_02.jpg',
    name: 'Freaks',
    category: 'movie',
    description: '"Freaks" (1932), directed by Tod Browning, is a cult horror film set within a traveling circus troupe comprised of individuals with physical deformities, affectionately known as "freaks." When a dwarf named Hans falls in love with the beautiful trapeze artist Cleopatra, she manipulates his emotions to inherit his fortune. However, the other members of the troupe uncover her scheme and seek revenge. The film explores themes of tolerance, family, and vengeance, and has become a classic for its originality and controversy.',
    media: {
      shareUrl: '#'
    },
    casting: [
      {
        actor: 'Wallace Ford',
        character: 'Hans'
      },
      {
        actor: 'Leila Hyams',
        character: 'Venus'
      },
      {
        actor: 'Olga Baclanova',
        character: 'Cleopatra'
      }
    ]
  };

  toggleFilters(): void {
    this.isOpenedFilters = !this.isOpenedFilters;
  }

  onAddToCart(item: CardNFT): void {
    this.store.dispatch(CartActions.add({ item }));
  }

}
